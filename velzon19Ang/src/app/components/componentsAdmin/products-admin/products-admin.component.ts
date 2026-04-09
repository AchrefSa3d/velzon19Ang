import { Component, OnInit } from '@angular/core';
import { TijaraApiService } from 'src/app/core/services/tijara-api.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  standalone: false
})
export class ProductsAdminComponent implements OnInit {

  breadCrumbItems = [
    { label: 'Admin' },
    { label: 'Validation Produits', active: true }
  ];

  pendingProducts: any[] = [];
  loading = true;

  constructor(private api: TijaraApiService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.api.getAdminPendingProducts().subscribe({
      next: (data: any[]) => { this.pendingProducts = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  approve(p: any): void {
    this.api.approveProduct(p.id).subscribe({
      next: () => { this.pendingProducts = this.pendingProducts.filter(x => x.id !== p.id); }
    });
  }

  reject(p: any): void {
    const reason = prompt('Raison du rejet (optionnel):', 'Produit non conforme.');
    if (reason === null) return;
    this.api.rejectProductAdmin(p.id, reason).subscribe({
      next: () => { this.pendingProducts = this.pendingProducts.filter(x => x.id !== p.id); }
    });
  }
}
