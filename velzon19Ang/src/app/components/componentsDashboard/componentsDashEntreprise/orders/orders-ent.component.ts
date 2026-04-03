import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-ent',
  templateUrl: './orders-ent.component.html',
  styleUrls: ['./orders-ent.component.scss'],
  standalone: false
})
export class OrdersEntComponent implements OnInit {

  breadCrumbItems = [
    { label: 'Vendeur' },
    { label: 'Mes Commandes', active: true }
  ];

  searchTerm = '';
  filterStatus = 'tous';
  statuses = ['En attente', 'Confirmée', 'Livrée', 'Annulée'];

  allOrders: any[] = [
    { id: 'TJR-001', client: 'Amine Touati',     ville: 'Tunis',    product: 'Écouteurs Bluetooth Pro', total: 130,  status: 'En attente', date: '29/03/2026' },
    { id: 'TJR-003', client: 'Ghaith Slimi',     ville: 'Sousse',   product: 'Smartphone 128GB',        total: 750,  status: 'Livrée',     date: '27/03/2026' },
    { id: 'TJR-006', client: 'Ines Karray',      ville: 'Monastir', product: 'Montre Connectée Sport',  total: 250,  status: 'Confirmée',  date: '24/03/2026' },
    { id: 'TJR-009', client: 'Maroua Ben Salah', ville: 'Sfax',     product: 'Smartphone 128GB',        total: 750,  status: 'Livrée',     date: '20/03/2026' },
    { id: 'TJR-012', client: 'Sami Cherif',      ville: 'Bizerte',  product: 'Tablette Éducative',      total: 150,  status: 'Confirmée',  date: '18/03/2026' },
    { id: 'TJR-015', client: 'Youssef Maatoug',  ville: 'Kairouan', product: 'Écouteurs Bluetooth Pro', total: 130,  status: 'Annulée',    date: '15/03/2026' },
  ];

  filteredOrders: any[] = [];
  selectedOrder: any = null;

  ngOnInit(): void {
    const stored = JSON.parse(sessionStorage.getItem('tijara_orders') || '[]');
    stored.forEach((o: any) => {
      this.allOrders.unshift({
        id:      o.orderNumber,
        client:  (o.address?.firstName || '') + ' ' + (o.address?.lastName || ''),
        ville:   o.address?.ville || o.address?.wilaya || '',
        product: o.items?.[0]?.product?.name || 'Produit',
        total:   o.total,
        status:  o.status,
        date:    o.date,
      });
    });
    this.applyFilter();
  }

  applyFilter() {
    let list = [...this.allOrders];
    if (this.filterStatus !== 'tous') list = list.filter(o => o.status === this.filterStatus);
    if (this.searchTerm.trim()) {
      const t = this.searchTerm.toLowerCase();
      list = list.filter(o =>
        o.id.toLowerCase().includes(t) ||
        o.client.toLowerCase().includes(t) ||
        o.product.toLowerCase().includes(t)
      );
    }
    this.filteredOrders = list;
  }

  changeStatus(order: any, status: string) {
    order.status = status;
    this.applyFilter();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'En attente': return 'bg-warning-subtle text-warning';
      case 'Confirmée':  return 'bg-info-subtle text-info';
      case 'Livrée':     return 'bg-success-subtle text-success';
      case 'Annulée':    return 'bg-danger-subtle text-danger';
      default:           return 'bg-secondary-subtle text-secondary';
    }
  }

  get countByStatus() {
    return {
      attente:   this.allOrders.filter(o => o.status === 'En attente').length,
      confirmee: this.allOrders.filter(o => o.status === 'Confirmée').length,
      livree:    this.allOrders.filter(o => o.status === 'Livrée').length,
      annulee:   this.allOrders.filter(o => o.status === 'Annulée').length,
    };
  }
}
