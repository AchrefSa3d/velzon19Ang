import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  standalone: false
})
export class ProfileUserComponent implements OnInit {

  editMode = false;
  passwordMode = false;
  saveSuccess = false;
  pwdSuccess = false;
  pwdError = '';

  breadcrumbItems = [
    { label: 'Mon Espace' },
    { label: 'Mon Profil', active: true }
  ];

  profile = {
    firstName: 'Sami',
    lastName: 'Khiari',
    email: 'sami.khiari@gmail.com',
    phone: '+216 98 123 456',
    address: '12 Rue de la République',
    city: 'Tunis',
    postalCode: '1000',
    country: 'Tunisie',
    birthDate: '1995-06-15',
    gender: 'Homme',
    newsletter: true,
    notifications: true,
  };

  editData = { ...this.profile };

  passwords = { current: '', newPwd: '', confirm: '' };
  showCurrent = false;
  showNew = false;

  stats = [
    { label: 'Commandes',       value: '12',  icon: 'ri-shopping-bag-3-line',    color: 'primary' },
    { label: 'Commandes livrées', value: '9', icon: 'ri-check-double-line',      color: 'success' },
    { label: 'Points fidélité', value: '480', icon: 'ri-medal-line',             color: 'warning' },
    { label: 'Réclamations',    value: '2',   icon: 'ri-customer-service-2-line', color: 'danger'  },
  ];

  ngOnInit(): void {}

  get initials(): string {
    return `${this.profile.firstName[0]}${this.profile.lastName[0]}`;
  }

  startEdit(): void {
    this.editData = { ...this.profile };
    this.editMode = true;
    this.saveSuccess = false;
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  saveProfile(): void {
    this.profile = { ...this.editData };
    this.editMode = false;
    this.saveSuccess = true;
    setTimeout(() => (this.saveSuccess = false), 3500);
  }

  savePassword(): void {
    this.pwdError = '';
    if (!this.passwords.current) {
      this.pwdError = 'Veuillez saisir votre mot de passe actuel.';
      return;
    }
    if (this.passwords.newPwd.length < 8) {
      this.pwdError = 'Le nouveau mot de passe doit comporter au moins 8 caractères.';
      return;
    }
    if (this.passwords.newPwd !== this.passwords.confirm) {
      this.pwdError = 'Les mots de passe ne correspondent pas.';
      return;
    }
    this.pwdSuccess = true;
    this.passwordMode = false;
    this.passwords = { current: '', newPwd: '', confirm: '' };
    setTimeout(() => (this.pwdSuccess = false), 3500);
  }
}
