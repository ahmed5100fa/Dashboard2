import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _ProductService = inject(ProductService);
  private fb = inject(FormBuilder);


  productId: string | null = null;
  product !: Product | undefined ;

  productForm !: FormGroup ;
  ngOnInit() {
    // featching id from url
     this.route.params.subscribe(param => {
      return this.productId = param['id'];
    });

    // find the product with the same id
    if(this.productId){
      this.product = this._ProductService.products().find((p) => {
        return p.id === Number(this.productId);
      });

    // Product form
      this.productForm = this.fb.group({
        name : [this.product?.name || '' , Validators.required],
        price: [this.product?.price || 0, [Validators.required, Validators.min(0.01)]],
        category: [this.product?.category || '', Validators.required],
        description: [this.product?.description || ''],
        inStock: [this.product?.inStock || false]
      })
    }
  }

  // save the changes
    save() {
    if (this.productForm.valid && this.product) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.productForm.value
      };
      this._ProductService.updateProduct(updatedProduct);
      alert('Product updated successfully!');
      this.router.navigate(['/products']);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
// cancel the changes
  cancel() {
    this.router.navigate(['/products']);
  }
}
