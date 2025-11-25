import { computed, Injectable, signal } from '@angular/core';
import { PRODUCTS } from '../../features/pages/products/data/products.mock';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  // Base Products
  products = signal<Product[]>(PRODUCTS);

  // Total Price
  totalPrice = computed(() => this.products().length);

  // Products in Stock Count
  stockProducts = computed(() => this.products().filter(p => p.inStock));

  // average price
  averagePrice = computed(() => {
    const productList = this.products();
    return Math.floor(productList.reduce((sum, product) => sum + product.price, 0) / productList.length);
  })

  // recent 5 products added
  recentFiveProducts = computed(() => this.products().slice(-5).reverse());

  // categories computed
  productCategories = computed(() => {
    return ["all", ...new Set(this.products().map(p => p.category))].sort();
  });

  // update product
  updateProduct(updatedProduct: Product) {
    const products = this.products();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.products.set([...products]);
    }
  }
}

