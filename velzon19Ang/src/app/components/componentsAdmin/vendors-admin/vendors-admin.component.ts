import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendors-admin',
  templateUrl: './vendors-admin.component.html',
  styleUrls: ['./vendors-admin.component.scss'],
  standalone: false
})
export class VendorsAdminComponent implements OnInit {

  breadCrumbItems = [
    { label: 'Admin' },
    { label: 'Gestion Vendeurs', active: true }
  ];

  filterStatus = 'tous';
  searchTerm = '';

  allVendors = [
    { id: 1, shop: 'TechTunis',    owner: 'Achraf Saad',     email: 'vendor@tijara.tn',  category: 'Électronique', ville: 'Tunis',    orders: 48, revenue: 18400, status: 'actif',      joined: '05/01/2026', avatar: 'AS' },
    { id: 2, shop: 'ModeTN',       owner: 'Aziz Tarchoun',   email: 'aziz@tijara.tn',    category: 'Mode',         ville: 'Sfax',     orders: 31, revenue: 9500,  status: 'actif',      joined: '08/01/2026', avatar: 'AZ' },
    { id: 3, shop: 'SportZone',    owner: 'Ghaith Slimi',    email: 'ghaith@tijara.tn',  category: 'Sport',        ville: 'Sousse',   orders: 0,  revenue: 0,     status: 'en attente', joined: '25/03/2026', avatar: 'GS' },
    { id: 4, shop: 'MaisonDeco',   owner: 'Amine Touati',    email: 'amine@tijara.tn',   category: 'Maison',       ville: 'Monastir', orders: 19, revenue: 6200,  status: 'actif',      joined: '12/02/2026', avatar: 'AM' },
    { id: 5, shop: 'NatureCare',   owner: 'Nour Hammami',    email: 'nour@tijara.tn',    category: 'Beauté',       ville: 'Nabeul',   orders: 25, revenue: 4100,  status: 'actif',      joined: '20/02/2026', avatar: 'NH' },
    { id: 6, shop: 'TechSousse',   owner: 'Sami Cherif',     email: 'sami@tijara.tn',    category: 'Électronique', ville: 'Sousse',   orders: 0,  revenue: 0,     status: 'en attente', joined: '28/03/2026', avatar: 'SC' },
    { id: 7, shop: 'FashionTN',    owner: 'Rania Gharbi',    email: 'rania@tijara.tn',   category: 'Mode',         ville: 'Ariana',   orders: 0,  revenue: 0,     status: 'en attente', joined: '27/03/2026', avatar: 'RG' },
    { id: 8, shop: 'KidsWorld',    owner: 'Youssef Maatoug', email: 'youssef@tijara.tn', category: 'Jouets',       ville: 'Bizerte',  orders: 8,  revenue: 1800,  status: 'suspendu',   joined: '15/02/2026', avatar: 'YM' },
  ];

  filteredVendors: any[] = [];

  ngOnInit(): void { this.applyFilter(); }

  applyFilter() {
    let list = [...this.allVendors];
    if (this.filterStatus !== 'tous') list = list.filter(v => v.status === this.filterStatus);
    if (this.searchTerm.trim()) {
      const t = this.searchTerm.toLowerCase();
      list = list.filter(v =>
        v.shop.toLowerCase().includes(t) ||
        v.owner.toLowerCase().includes(t) ||
        v.email.toLowerCase().includes(t)
      );
    }
    this.filteredVendors = list;
  }

  approve(vendor: any) { vendor.status = 'actif'; this.applyFilter(); }
  reject(vendor: any)  { vendor.status = 'suspendu'; this.applyFilter(); }
  suspend(vendor: any) { vendor.status = vendor.status === 'actif' ? 'suspendu' : 'actif'; this.applyFilter(); }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'actif':      return 'bg-success-subtle text-success';
      case 'en attente': return 'bg-warning-subtle text-warning';
      case 'suspendu':   return 'bg-danger-subtle text-danger';
      default:           return 'bg-secondary-subtle text-secondary';
    }
  }

  get counts() {
    return {
      total:    this.allVendors.length,
      actif:    this.allVendors.filter(v => v.status === 'actif').length,
      attente:  this.allVendors.filter(v => v.status === 'en attente').length,
      suspendu: this.allVendors.filter(v => v.status === 'suspendu').length,
    };
  }
}
