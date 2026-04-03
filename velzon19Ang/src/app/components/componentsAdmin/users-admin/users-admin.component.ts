import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
  standalone: false
})
export class UsersAdminComponent implements OnInit {

  breadCrumbItems = [
    { label: 'Admin' },
    { label: 'Utilisateurs', active: true }
  ];

  searchTerm = '';
  filterRole = 'tous';

  allUsers = [
    { id: 1, name: 'Amine Touati',      email: 'user@tijara.tn',    role: 'user',   status: 'actif',      joined: '10/01/2026', orders: 5,  avatar: 'AT' },
    { id: 2, name: 'Maroua Ben Salah',  email: 'maroua@tijara.tn',  role: 'user',   status: 'actif',      joined: '15/01/2026', orders: 12, avatar: 'MB' },
    { id: 3, name: 'Ghaith Slimi',      email: 'ghaith@tijara.tn',  role: 'user',   status: 'inactif',    joined: '20/01/2026', orders: 2,  avatar: 'GS' },
    { id: 4, name: 'Achraf Saad',       email: 'vendor@tijara.tn',  role: 'vendor', status: 'actif',      joined: '05/01/2026', orders: 48, avatar: 'AS' },
    { id: 5, name: 'Aziz Tarchoun',     email: 'aziz@tijara.tn',    role: 'vendor', status: 'actif',      joined: '08/01/2026', orders: 31, avatar: 'AZ' },
    { id: 6, name: 'Sami Cherif',       email: 'sami@tijara.tn',    role: 'user',   status: 'bloqué',     joined: '22/02/2026', orders: 0,  avatar: 'SC' },
    { id: 7, name: 'Nour Hammami',      email: 'nour@tijara.tn',    role: 'user',   status: 'actif',      joined: '01/03/2026', orders: 7,  avatar: 'NH' },
    { id: 8, name: 'Rania Gharbi',      email: 'rania@tijara.tn',   role: 'vendor', status: 'en attente', joined: '25/03/2026', orders: 0,  avatar: 'RG' },
  ];

  filteredUsers: any[] = [];

  ngOnInit(): void { this.applyFilter(); }

  applyFilter() {
    let list = [...this.allUsers];
    if (this.filterRole !== 'tous') list = list.filter(u => u.role === this.filterRole);
    if (this.searchTerm.trim()) {
      const t = this.searchTerm.toLowerCase();
      list = list.filter(u => u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t));
    }
    this.filteredUsers = list;
  }

  toggleStatus(user: any) {
    user.status = user.status === 'actif' ? 'bloqué' : 'actif';
    this.applyFilter();
  }

  deleteUser(user: any) {
    this.allUsers = this.allUsers.filter(u => u.id !== user.id);
    this.applyFilter();
  }

  getRoleBadge(role: string): string {
    switch (role) {
      case 'admin':  return 'bg-danger-subtle text-danger';
      case 'vendor': return 'bg-info-subtle text-info';
      default:       return 'bg-primary-subtle text-primary';
    }
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'actif':       return 'bg-success-subtle text-success';
      case 'inactif':     return 'bg-secondary-subtle text-secondary';
      case 'bloqué':      return 'bg-danger-subtle text-danger';
      case 'en attente':  return 'bg-warning-subtle text-warning';
      default:            return 'bg-secondary-subtle text-secondary';
    }
  }

  get counts() {
    return {
      total:   this.allUsers.length,
      users:   this.allUsers.filter(u => u.role === 'user').length,
      vendors: this.allUsers.filter(u => u.role === 'vendor').length,
      blocked: this.allUsers.filter(u => u.status === 'bloqué').length,
    };
  }
}
