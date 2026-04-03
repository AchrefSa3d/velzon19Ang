import { Component, OnInit } from '@angular/core';

interface Reclamation {
  id: string;
  user: string;
  email: string;
  role: string;
  sujet: string;
  message: string;
  date: string;
  statut: string;
}

@Component({
  selector: 'app-viewreclamations',
  standalone: false,
  templateUrl: './viewreclamations.html',
  styleUrl: './viewreclamations.scss',
})
export class Viewreclamations implements OnInit {

  breadCrumbItems = [
    { label: 'Admin' },
    { label: 'Réclamations', active: true }
  ];

  statuses = ['En attente', 'En cours', 'Résolue', 'Rejetée'];
  filterStatut = 'tous';
  searchTerm = '';

  reclamations: Reclamation[] = [
    { id: 'REC-001', user: 'Amine Touati',     email: 'user@tijara.tn',      role: 'Client',  sujet: 'Commande non reçue',       message: 'Ma commande TJR-028 n\'est pas arrivée après 7 jours.',          date: '29/03/2026', statut: 'En attente' },
    { id: 'REC-002', user: 'Maroua Ben Salah', email: 'maroua@gmail.com',    role: 'Client',  sujet: 'Produit défectueux',        message: 'Le smartphone reçu a un écran fissuré dès l\'ouverture.',        date: '28/03/2026', statut: 'En cours'   },
    { id: 'REC-003', user: 'Achraf Saad',      email: 'vendor@tijara.tn',    role: 'Vendeur', sujet: 'Problème de paiement',      message: 'Mon virement de mars 2026 n\'a pas été effectué.',               date: '27/03/2026', statut: 'Résolue'    },
    { id: 'REC-004', user: 'Ghaith Slimi',     email: 'ghaith@gmail.com',    role: 'Client',  sujet: 'Remboursement en attente',  message: 'J\'ai annulé ma commande TJR-021 il y a 10 jours, pas de remb.', date: '26/03/2026', statut: 'En attente' },
    { id: 'REC-005', user: 'Rania Gharbi',     email: 'rania@fashiontn.com', role: 'Vendeur', sujet: 'Compte suspendu sans raison',message: 'Mon compte a été suspendu sans notification préalable.',          date: '25/03/2026', statut: 'En cours'   },
    { id: 'REC-006', user: 'Nour Hammami',     email: 'nour@gmail.com',      role: 'Client',  sujet: 'Mauvaise description produit',message: 'La taille indiquée ne correspond pas au produit reçu.',         date: '24/03/2026', statut: 'Rejetée'    },
  ];

  filteredReclamations: Reclamation[] = [];
  selectedRec: Reclamation | null = null;

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredReclamations = this.reclamations.filter(r => {
      const matchStatut = this.filterStatut === 'tous' || r.statut === this.filterStatut;
      const matchSearch = !this.searchTerm ||
        r.user.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.sujet.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchStatut && matchSearch;
    });
  }

  changeStatut(rec: Reclamation, statut: string): void {
    rec.statut = statut;
    this.applyFilter();
  }

  showDetail(rec: Reclamation): void {
    this.selectedRec = rec;
  }

  closeDetail(): void {
    this.selectedRec = null;
  }

  getStatusClass(statut: string): string {
    switch (statut) {
      case 'En attente': return 'bg-warning-subtle text-warning';
      case 'En cours':   return 'bg-info-subtle text-info';
      case 'Résolue':    return 'bg-success-subtle text-success';
      case 'Rejetée':    return 'bg-danger-subtle text-danger';
      default:           return 'bg-secondary-subtle text-secondary';
    }
  }

  getRoleClass(role: string): string {
    return role === 'Vendeur' ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary';
  }

  get countByStatut() {
    return {
      attente: this.reclamations.filter(r => r.statut === 'En attente').length,
      cours:   this.reclamations.filter(r => r.statut === 'En cours').length,
      resolue: this.reclamations.filter(r => r.statut === 'Résolue').length,
      rejetee: this.reclamations.filter(r => r.statut === 'Rejetée').length,
    };
  }
}
