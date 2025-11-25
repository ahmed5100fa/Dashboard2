import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(product: Product[], searchInp : string , category : string): Product[] {
      if (!product) return [];

    let filtered = product;

    // search
    if (searchInp && searchInp.trim() !== '') {
      const s = searchInp.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
      );
    }

    // category
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    return filtered;
  }

  }


