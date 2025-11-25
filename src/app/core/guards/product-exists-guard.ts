import { CanActivateFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const productExistsGuard: CanActivateFn = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);

  const id = +route.params['id'];
  const product = productService.products().find(p => p.id === id);

  if (product) {
    return true;
  } else {
    router.navigate(['/not-found']);
    return false;
  }
};
