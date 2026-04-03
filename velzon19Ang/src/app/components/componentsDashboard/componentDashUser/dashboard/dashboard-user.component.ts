import { Component, OnInit } from '@angular/core';

interface RecentOrder {
  id: string;
  date: string;
  vendor: string;
  items: string;
  total: number;
  status: string;
}

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  standalone: false
})
export class DashboardUserComponent implements OnInit {

  userName = 'Sami';
  today = new Date();

  breadcrumbItems = [
    { label: 'Mon Espace' },
    { label: 'Tableau de bord', active: true }
  ];

  stats = [
    { icon: 'ri-shopping-bag-3-line', label: 'Total Commandes', value: '12', color: 'primary' },
    { icon: 'ri-check-double-line', label: 'Commandes livrées', value: '9', color: 'success' },
    { icon: 'ri-heart-3-line', label: 'Liste de souhaits', value: '5', color: 'danger' },
    { icon: 'ri-customer-service-2-line', label: 'Réclamations', value: '2', color: 'warning' },
  ];

  recentOrders: RecentOrder[] = [
    { id: 'TJR-045', date: '28/03/2026', vendor: 'TechTunis',     items: 'Écouteurs Bluetooth Pro',   total: 89,  status: 'Expédiée'  },
    { id: 'TJR-038', date: '21/03/2026', vendor: 'SportZone',     items: 'Chaussures Running X3',     total: 145, status: 'Livrée'    },
    { id: 'TJR-031', date: '14/03/2026', vendor: 'ModeTN',        items: 'T-shirt + Jean Slim Fit',   total: 112, status: 'Livrée'    },
    { id: 'TJR-024', date: '06/03/2026', vendor: 'NatureCare',    items: 'Huile d\'Argan Bio 100ml',  total: 38,  status: 'Annulée'   },
    { id: 'TJR-017', date: '27/02/2026', vendor: 'MaisonDeco',    items: 'Cafetière Italienne Inox',  total: 110, status: 'Livrée'    },
  ];

  categories = [
    { icon: 'ri-computer-line',    label: 'Électronique', color: 'primary',   count: '4 120' },
    { icon: 'ri-t-shirt-line',     label: 'Mode',         color: 'info',      count: '2 890' },
    { icon: 'ri-run-line',         label: 'Sport',        color: 'success',   count: '1 560' },
    { icon: 'ri-home-2-line',      label: 'Maison',       color: 'warning',   count: '980'   },
    { icon: 'ri-leaf-line',        label: 'Bien-être',    color: 'danger',    count: '740'   },
    { icon: 'ri-restaurant-line',  label: 'Alimentation', color: 'secondary', count: '620'   },
  ];

  ngOnInit(): void {}

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
}
