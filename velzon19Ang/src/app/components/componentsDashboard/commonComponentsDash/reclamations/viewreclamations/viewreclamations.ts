import { Component, OnInit } from '@angular/core';

interface ReclamationUser {
  id: string;
  sujet: string;
  message: string;
  date: string;
  statut: string;
}

@Component({
  selector: 'app-viewreclamations-user',
  standalone: false,
  templateUrl: './viewreclamations.html',
  styleUrl: './viewreclamations.scss',
})
export class ViewreclamationsExtern implements OnInit {

  breadCrumbItems = [
    { label: 'Mon Compte' },
    { label: 'Mes Réclamations', active: true }
  ];

  showForm = false;
  submitting = false;
  submitSuccess = false;

  newSujet = '';
  newMessage = '';

  reclamations: ReclamationUser[] = [
    {
      id: 'REC-004',
      sujet: 'Remboursement en attente',
      message: 'J\'ai annulé ma commande TJR-021 il y a 10 jours et je n\'ai toujours pas reçu mon remboursement.',
      date: '26/03/2026',
      statut: 'En attente'
    },
    {
      id: 'REC-007',
      sujet: 'Retard de livraison',
      message: 'Ma commande TJR-030 devait arriver le 25/03 mais toujours rien.',
      date: '20/03/2026',
      statut: 'En cours'
    },
  ];

  ngOnInit(): void {
    const stored = sessionStorage.getItem('tijara_reclamations_user');
    if (stored) {
      const extra: ReclamationUser[] = JSON.parse(stored);
      this.reclamations = [...this.reclamations, ...extra];
    }
  }

  submitReclamation(): void {
    if (!this.newSujet.trim() || !this.newMessage.trim()) return;
    const rec: ReclamationUser = {
      id: 'REC-' + (100 + this.reclamations.length + 1),
      sujet: this.newSujet.trim(),
      message: this.newMessage.trim(),
      date: new Date().toLocaleDateString('fr-TN'),
      statut: 'En attente'
    };
    this.reclamations.unshift(rec);
    const extras = this.reclamations.filter(r => r.id.startsWith('REC-1') || parseInt(r.id.split('-')[1]) > 100);
    sessionStorage.setItem('tijara_reclamations_user', JSON.stringify(extras));
    this.newSujet = '';
    this.newMessage = '';
    this.showForm = false;
    this.submitSuccess = true;
    setTimeout(() => this.submitSuccess = false, 3000);
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

  getStatusIcon(statut: string): string {
    switch (statut) {
      case 'En attente': return 'ri-time-line';
      case 'En cours':   return 'ri-loader-4-line';
      case 'Résolue':    return 'ri-checkbox-circle-line';
      case 'Rejetée':    return 'ri-close-circle-line';
      default:           return 'ri-question-line';
    }
  }
}
