import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Table } from "./components/table/table";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Table , CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private _ProductService = inject(ProductService);

  // loading
  loading = signal(true);

  // Total Price
  totalPrice = this._ProductService.totalPrice;

  // products in the stock
  stockProducts = this._ProductService.stockProducts;

  // Average Price
  averagePrice = this._ProductService.averagePrice;


  ngOnInit(){
      setTimeout(() => {
    this.loading.set(false);
  }, 500);
  }

}
