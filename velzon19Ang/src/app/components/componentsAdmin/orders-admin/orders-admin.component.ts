import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.scss'],
  standalone: false
})
export class OrdersAdminComponent implements OnInit {

  breadCrumbItems = [
    { label: 'Admin' },
    { label: 'Toutes les Commandes', active: true }
  ];

  searchTerm = '';
  filterStatus = 'tous';
  statuses = ['En attente', 'Confirmée', 'Livrée', 'Annulée'];

  allOrders: any[] = [
    { id: 'TJR-001', client: 'Amine Touati',     vendor: 'TechTunis',  ville: 'Tunis',    product: 'Écouteurs Bluetooth Pro', qty: 1, total: 130,  status: 'En attente', date: '29/03/2026' },
    { id: 'TJR-002', client: 'Maroua Ben Salah', vendor: 'ModeTN',     ville: 'Sfax',     product: 'Veste en Cuir Homme',     qty: 1, total: 350,  status: 'Confirmée',  date: '28/03/2026' },
    { id: 'TJR-003', client: 'Ghaith Slimi',     vendor: 'TechTunis',  ville: 'Sousse',   product: 'Smartphone 128GB',        qty: 1, total: 750,  status: 'Livrée',     date: '27/03/2026' },
    { id: 'TJR-004', client: 'Sami Cherif',      vendor: 'SportZone',  ville: 'Bizerte',  product: 'Vélo de Route Carbon',    qty: 1, total: 950,  status: 'Annulée',    date: '26/03/2026' },
    { id: 'TJR-005', client: 'Nour Hammami',     vendor: 'MaisonDeco', ville: 'Nabeul',   product: 'Aspirateur Robot WiFi',   qty: 1, total: 480,  status: 'En attente', date: '25/03/2026' },
    { id: 'TJR-006', client: 'Ines Karray',      vendor: 'TechTunis',  ville: 'Monastir', product: 'Montre Connectée Sport',  qty: 1, total: 250,  status: 'Confirmée',  date: '24/03/2026' },
    { id: 'TJR-007', client: 'Youssef Maatoug',  vendor: 'NatureCare', ville: 'Kairouan', product: 'Crème Hydratante Bio',    qty: 3, total: 75,   status: 'Livrée',     date: '23/03/2026' },
    { id: 'TJR-008', client: 'Rania Gharbi',     vendor: 'ModeTN',     ville: 'Ariana',   product: 'Sac à Main Femme Cuir',   qty: 1, total: 200,  status: 'Confirmée',  date: '22/03/2026' },
  ];

  filteredOrders: any[] = [];

  ngOnInit(): void {
    const stored = JSON.parse(sessionStorage.getItem('tijara_orders') || '[]');
    stored.forEach((o: any) => {
      this.allOrders.unshift({
        id:      o.orderNumber,
        client:  (o.address?.firstName || '') + ' ' + (o.address?.lastName || ''),
        vendor:  'Tijara Marketplace',
        ville:   o.address?.ville || o.address?.wilaya || '',
        product: o.items?.[0]?.product?.name || 'Produit',
        qty:     o.items?.[0]?.qty || 1,
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
        o.vendor.toLowerCase().includes(t) ||
        o.ville.toLowerCase().includes(t)
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

  get totalRevenue(): number {
    return this.allOrders.filter(o => o.status === 'Livrée').reduce((sum, o) => sum + o.total, 0);
  }
}
