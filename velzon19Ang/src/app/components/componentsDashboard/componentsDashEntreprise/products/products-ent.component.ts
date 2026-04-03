import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface VendorProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'actif' | 'inactif';
  sales: number;
  image: string;
}

@Component({
  selector: 'app-products-ent',
  templateUrl: './products-ent.component.html',
  styleUrls: ['./products-ent.component.scss'],
  standalone: false
})
export class ProductsEntComponent implements OnInit {

  breadCrumbItems = [
    { label: 'Vendeur' },
    { label: 'Mes Produits', active: true }
  ];

  products: VendorProduct[] = [
    { id: 1, name: 'Écouteurs Bluetooth Pro',  category: 'Électronique', price: 130,  stock: 15, status: 'actif',   sales: 18, image: 'assets/images/products/img-1.png' },
    { id: 2, name: 'Montre Connectée Sport',   category: 'Électronique', price: 250,  stock: 8,  status: 'actif',   sales: 12, image: 'assets/images/products/img-2.png' },
    { id: 3, name: 'Smartphone 128GB',         category: 'Électronique', price: 750,  stock: 25, status: 'actif',   sales: 9,  image: 'assets/images/products/img-9.png' },
    { id: 4, name: 'Tapis Yoga Antidérapant',  category: 'Sport',        price: 50,   stock: 0,  status: 'inactif', sales: 7,  image: 'assets/images/products/img-2.png' },
  ];

  filteredProducts: VendorProduct[] = [];
  searchTerm = '';
  filterStatus = 'tous';
  showForm = false;
  editMode = false;
  selectedProduct: VendorProduct | null = null;
  productForm!: FormGroup;

  categories = ['Électronique', 'Mode', 'Maison', 'Sport', 'Beauté', 'Jouets', 'Alimentation'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.applyFilter();
    this.initForm();
  }

  initForm(p?: VendorProduct) {
    this.productForm = this.fb.group({
      name:     [p?.name     || '', [Validators.required, Validators.minLength(3)]],
      category: [p?.category || '', Validators.required],
      price:    [p?.price    || '', [Validators.required, Validators.min(1)]],
      stock:    [p?.stock    || 0,  [Validators.required, Validators.min(0)]],
      status:   [p?.status   || 'actif'],
    });
  }

  get f() { return this.productForm.controls; }

  applyFilter() {
    let list = [...this.products];
    if (this.filterStatus !== 'tous') {
      list = list.filter(p => p.status === this.filterStatus);
    }
    if (this.searchTerm.trim()) {
      const t = this.searchTerm.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t));
    }
    this.filteredProducts = list;
  }

  openAdd() {
    this.editMode = false;
    this.selectedProduct = null;
    this.initForm();
    this.showForm = true;
  }

  openEdit(p: VendorProduct) {
    this.editMode = true;
    this.selectedProduct = p;
    this.initForm(p);
    this.showForm = true;
  }

  saveProduct() {
    if (this.productForm.invalid) return;
    const val = this.productForm.value;
    if (this.editMode && this.selectedProduct) {
      const idx = this.products.findIndex(p => p.id === this.selectedProduct!.id);
      this.products[idx] = { ...this.selectedProduct, ...val };
    } else {
      const newProd: VendorProduct = {
        id: Date.now(),
        ...val,
        sales: 0,
        image: 'assets/images/products/img-1.png',
      };
      this.products.unshift(newProd);
    }
    this.showForm = false;
    this.applyFilter();
  }

  toggleStatus(p: VendorProduct) {
    p.status = p.status === 'actif' ? 'inactif' : 'actif';
    this.applyFilter();
  }

  deleteProduct(id: number) {
    if (confirm('Supprimer ce produit ?')) {
      this.products = this.products.filter(p => p.id !== id);
      this.applyFilter();
    }
  }

  get activeCount()   { return this.products.filter(p => p.status === 'actif').length; }
  get inactiveCount() { return this.products.filter(p => p.status === 'inactif').length; }
  get totalSales()    { return this.products.reduce((s, p) => s + p.sales, 0); }
}
