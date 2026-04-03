import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels,
  ApexStroke, ApexTooltip, ApexFill, ApexNonAxisChartSeries,
  ApexPlotOptions, ApexLegend
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard-ent',
  templateUrl: './dashboard-ent.component.html',
  styleUrls: ['./dashboard-ent.component.scss'],
  standalone: false
})
export class DashboardEntComponent implements OnInit {

  breadCrumbItems = [
    { label: 'Vendeur' },
    { label: 'Tableau de bord', active: true }
  ];

  vendorName = 'Achraf Saad';
  shopName   = 'TechTunis';

  stats = [
    { label: 'Commandes du mois',  value: 48,         icon: 'ri-shopping-bag-3-line',      color: 'primary', trend: '+8%'  },
    { label: 'Revenus du mois',    value: '4 800 DT',  icon: 'ri-money-dollar-circle-line', color: 'success', trend: '+15%' },
    { label: 'Produits en ligne',  value: 12,         icon: 'ri-store-2-line',              color: 'info',    trend: '+2%'  },
    { label: 'Clients satisfaits', value: '94%',      icon: 'ri-star-line',                 color: 'warning', trend: '+3%'  },
  ];

  recentOrders: any[] = [
    { id: 'TJR-001', client: 'Amine Touati',    product: 'Écouteurs Bluetooth Pro', total: 130,  status: 'En attente', date: '29/03/2026' },
    { id: 'TJR-003', client: 'Ghaith Slimi',    product: 'Smartphone 128GB',        total: 750,  status: 'Livrée',     date: '27/03/2026' },
    { id: 'TJR-006', client: 'Ines Karray',     product: 'Montre Connectée Sport',  total: 250,  status: 'Confirmée',  date: '24/03/2026' },
    { id: 'TJR-009', client: 'Maroua Ben Salah',product: 'Smartphone 128GB',        total: 750,  status: 'Livrée',     date: '20/03/2026' },
    { id: 'TJR-012', client: 'Sami Cherif',     product: 'Tablette Éducative',      total: 150,  status: 'Confirmée',  date: '18/03/2026' },
  ];

  topProducts = [
    { name: 'Smartphone 128GB',       sales: 18, revenue: 13500, progress: 90 },
    { name: 'Montre Connectée Sport', sales: 14, revenue: 3500,  progress: 70 },
    { name: 'Écouteurs Bluetooth',    sales: 11, revenue: 1430,  progress: 55 },
    { name: 'Tablette Éducative',     sales: 5,  revenue: 750,   progress: 25 },
  ];

  areaSeries: ApexAxisChartSeries = [{
    name: 'Commandes', data: [4, 7, 5, 9, 8, 12, 11, 15, 13, 18, 16, 20]
  }, {
    name: 'Revenus (K DT)', data: [0.5, 1, 0.7, 1.4, 1.2, 1.8, 1.6, 2.2, 2, 2.8, 2.4, 3]
  }];

  areaChart: ApexChart = { type: 'area', height: 260, toolbar: { show: false }, zoom: { enabled: false } };
  areaXAxis: ApexXAxis = {
    categories: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
    axisBorder: { show: false }, axisTicks: { show: false }
  };
  areaStroke: ApexStroke  = { curve: 'smooth', width: 2 };
  areaFill: ApexFill      = { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } };
  areaDataLabels: ApexDataLabels = { enabled: false };
  areaTooltip: ApexTooltip = { x: { format: 'MMM' } };

  donutSeries: ApexNonAxisChartSeries = [40, 30, 18, 12];
  donutChart: ApexChart = { type: 'donut', height: 240 };
  donutLabels = ['Smartphones', 'Montres', 'Écouteurs', 'Tablettes'];
  donutLegend: ApexLegend = { position: 'bottom' };
  donutPlotOptions: ApexPlotOptions = { pie: { donut: { size: '65%' } } };

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (user.firstName) this.vendorName = user.firstName + ' ' + (user.lastName || '');
    if (user.shopName)  this.shopName   = user.shopName;

    const stored = JSON.parse(sessionStorage.getItem('tijara_orders') || '[]');
    stored.slice(0, 3).forEach((o: any) => {
      this.recentOrders.unshift({
        id:      o.orderNumber,
        client:  (o.address?.firstName || '') + ' ' + (o.address?.lastName || ''),
        product: o.items?.[0]?.product?.name || 'Produit',
        total:   o.total,
        status:  o.status,
        date:    o.date,
      });
    });
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
}
