import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../core/services/product.service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
    _ProductService = inject(ProductService);

    // recent Five Products
    recentFiveProducts = this._ProductService.recentFiveProducts;

    show(){
      console.log(this.recentFiveProducts());
    }

  }
