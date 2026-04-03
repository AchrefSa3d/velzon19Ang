import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels,
  ApexStroke, ApexTooltip, ApexFill, ApexNonAxisChartSeries,
  ApexPlotOptions, ApexLegend
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  standalone: false
})
export class DashboardAdminComponent implements OnInit {

  breadCrumbItems = [
    { label: 'Admin' },
    { label: 'Dashboard', active: true }
  ];

  stats = [
    { label: 'Utilisateurs',       value: 1248,      icon: 'ri-user-3-line',              color: 'primary', trend: '+12%' },
    { label: 'Vendeurs',           value: 87,         icon: 'ri-store-2-line',              color: 'info',    trend: '+5%'  },
    { label: 'Commandes',          value: 3420,       icon: 'ri-shopping-bag-3-line',       color: 'success', trend: '+18%' },
    { label: 'Chiffre d\'affaires', value: '142K DT', icon: 'ri-money-dollar-circle-line',  color: 'warning', trend: '+9%'  },
  ];

  recentOrders = [
    { id: 'TJR-031', client: 'Amine Touati',   vendor: 'TechTunis',  total: 130,  status: 'Livrée',     date: '29/03/2026' },
    { id: 'TJR-030', client: 'Maroua Ben Salah', vendor: 'ModeTN',   total: 350,  status: 'Confirmée',  date: '29/03/2026' },
    { id: 'TJR-029', client: 'Ghaith Slimi',   vendor: 'TechTunis',  total: 750,  status: 'En attente', date: '28/03/2026' },
    { id: 'TJR-028', client: 'Sami Cherif',    vendor: 'SportZone',  total: 250,  status: 'Annulée',    date: '28/03/2026' },
    { id: 'TJR-027', client: 'Nour Hammami',   vendor: 'MaisonDeco', total: 480,  status: 'Livrée',     date: '27/03/2026' },
  ];

  pendingVendors = [
    { name: 'TechSousse',    owner: 'Aziz Tarchoun',  category: 'Électronique', date: '28/03/2026' },
    { name: 'FashionTN',     owner: 'Rania Gharbi',   category: 'Mode',         date: '27/03/2026' },
    { name: 'BioNatureTN',   owner: 'Youssef Maatoug',category: 'Alimentation', date: '26/03/2026' },
  ];

  salesSeries: ApexAxisChartSeries = [{
    name: 'Commandes', data: [65, 85, 120, 98, 140, 175, 160, 210, 195, 230, 250, 280]
  }, {
    name: 'Revenus (K DT)', data: [4, 6, 9, 7, 11, 13, 12, 17, 15, 19, 20, 23]
  }];

  salesChart: ApexChart = { type: 'area', height: 280, toolbar: { show: false }, zoom: { enabled: false } };
  salesXAxis: ApexXAxis = {
    categories: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
    axisBorder: { show: false }, axisTicks: { show: false }
  };
  salesStroke: ApexStroke = { curve: 'smooth', width: 2 };
  salesFill: ApexFill = { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } };
  salesDataLabels: ApexDataLabels = { enabled: false };
  salesTooltip: ApexTooltip = { x: { format: 'MMM' } };

  catSeries: ApexNonAxisChartSeries = [35, 25, 18, 12, 10];
  catChart: ApexChart = { type: 'donut', height: 260 };
  catLabels = ['Électronique', 'Mode', 'Maison', 'Sport', 'Autre'];
  catLegend: ApexLegend = { position: 'bottom' };
  catPlotOptions: ApexPlotOptions = { pie: { donut: { size: '65%' } } };

  ngOnInit(): void {}

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
