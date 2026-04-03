import { Component, OnInit } from '@angular/core';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  bgColor: string;
}

interface Order {
  id: string;
  date: string;
  vendor: string;
  items: OrderItem[];
  total: number;
  status: string;
  address: string;
  payment: string;
}

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  standalone: false
})
export class OrdersUserComponent implements OnInit {

  activeTab = 'Toutes';
  searchTerm = '';
  selectedOrder: Order | null = null;

  breadcrumbItems = [
    { label: 'Mon Espace' },
    { label: 'Mes Commandes', active: true }
  ];

  tabs = ['Toutes', 'En attente', 'Confirmée', 'Expédiée', 'Livrée', 'Annulée'];

  allOrders: Order[] = [
    {
      id: 'TJR-045', date: '28/03/2026', vendor: 'TechTunis',
      items: [{ name: 'Écouteurs Bluetooth Pro X8', qty: 1, price: 89, bgColor: '#e3f2fd' }],
      total: 89, status: 'Expédiée',
      address: '12 Rue de la République, Tunis 1000',
      payment: 'Paiement à la livraison'
    },
    {
      id: 'TJR-038', date: '21/03/2026', vendor: 'SportZone',
      items: [
        { name: 'Chaussures Running X3', qty: 1, price: 135, bgColor: '#e8f5e9' },
        { name: 'Chaussettes Sport (3 paires)', qty: 1, price: 10, bgColor: '#e8f5e9' }
      ],
      total: 145, status: 'Livrée',
      address: '45 Avenue Habib Bourguiba, Sfax',
      payment: 'Carte bancaire'
    },
    {
      id: 'TJR-031', date: '14/03/2026', vendor: 'ModeTN',
      items: [
        { name: 'T-shirt Coton Premium (x2)', qty: 2, price: 25, bgColor: '#fce4ec' },
        { name: 'Jean Slim Fit 32/32', qty: 1, price: 62, bgColor: '#fce4ec' }
      ],
      total: 112, status: 'Livrée',
      address: '8 Rue Ibn Khaldoun, Sousse',
      payment: 'Virement bancaire'
    },
    {
      id: 'TJR-024', date: '06/03/2026', vendor: 'NatureCare',
      items: [{ name: "Huile d'Argan Bio 100ml", qty: 2, price: 19, bgColor: '#f3e5f5' }],
      total: 38, status: 'Annulée',
      address: '22 Cité El Menzah, Ariana',
      payment: 'Paiement à la livraison'
    },
    {
      id: 'TJR-017', date: '27/02/2026', vendor: 'MaisonDeco',
      items: [{ name: 'Cafetière Italienne Inox', qty: 1, price: 110, bgColor: '#fff8e1' }],
      total: 110, status: 'Livrée',
      address: '12 Rue de la République, Tunis 1000',
      payment: 'Carte bancaire'
    },
    {
      id: 'TJR-010', date: '15/02/2026', vendor: 'TechTunis',
      items: [{ name: 'Chargeur USB-C 65W Rapide', qty: 1, price: 45, bgColor: '#e3f2fd' }],
      total: 45, status: 'En attente',
      address: '12 Rue de la République, Tunis 1000',
      payment: 'Paiement à la livraison'
    },
  ];

  ngOnInit(): void {}

  get filteredOrders(): Order[] {
    return this.allOrders.filter(o => {
      const matchTab = this.activeTab === 'Toutes' || o.status === this.activeTab;
      const matchSearch = !this.searchTerm ||
        o.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.vendor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.items.some(i => i.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      return matchTab && matchSearch;
    });
  }

  countByStatus(status: string): number {
    if (status === 'Toutes') return this.allOrders.length;
    return this.allOrders.filter(o => o.status === status).length;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Livrée':    'badge bg-success-subtle text-success',
      'Expédiée':  'badge bg-info-subtle text-info',
      'Confirmée': 'badge bg-primary-subtle text-primary',
      'En attente':'badge bg-warning-subtle text-warning',
      'Annulée':   'badge bg-danger-subtle text-danger',
    };
    return map[status] || 'badge bg-secondary-subtle text-secondary';
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      'Livrée':    'success',
      'Expédiée':  'info',
      'Confirmée': 'primary',
      'En attente':'warning',
      'Annulée':   'danger',
    };
    return map[status] || 'secondary';
  }

  getTimelineSteps(status: string): { label: string; icon: string; done: boolean }[] {
    const steps = [
      { label: 'Commandé',  icon: 'ri-shopping-bag-3-line' },
      { label: 'Confirmée', icon: 'ri-check-double-line' },
      { label: 'Expédiée',  icon: 'ri-truck-line' },
      { label: 'Livrée',    icon: 'ri-home-2-line' },
    ];
    const statusIdx: Record<string, number> = {
      'En attente': 0, 'Confirmée': 1, 'Expédiée': 2, 'Livrée': 3
    };
    const currentIdx = statusIdx[status] ?? -1;
    return steps.map((s, i) => ({ ...s, done: i <= currentIdx }));
  }

  toggleOrder(order: Order): void {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }

  getOrderTotal(order: Order): number {
    return order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}
