import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from "../../../../shared/pipes/filter-pipe";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  private _ProductService = inject(ProductService);
  private filterPipe = new FilterPipe();

  searchQuery = signal('');
  selectedCategory = signal('all');
  loading = signal(true);

  // Pagination signals
  currentPage = signal(1);
  pageSize = 8; // Number of products per page

  products = this._ProductService.products;
  productCategories = this._ProductService.productCategories;

  // Filtered products
  filteredProducts = computed(() => {
    return this.filterPipe.transform(
      this.products(),
      this.searchQuery(),
      this.selectedCategory()
    );
  });

  // Total pages calculation
  totalPages = computed(() => {
    return Math.ceil(this.filteredProducts().length / this.pageSize);
  });

  // Paginated products
  paginatedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredProducts().slice(startIndex, endIndex);
  });

  // Page numbers array
  pageNumbers = computed(() => {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  // Go to specific page
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  // Handle search changes
  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1); // Reset to first page when search changes
  }

  // Handle category changes
  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
    this.currentPage.set(1); // Reset to first page when category changes
  }



  ngOnInit(){
      setTimeout(() => {
    this.loading.set(false);
  }, 500);
  }
}
