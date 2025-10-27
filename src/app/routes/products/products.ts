import { Component, OnInit } from '@angular/core';
import { ZardPaginationModule } from '../../shared/components/pagination/pagination.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from '../../shared/components/layout/content.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/layout/footer.component';
import { SidebarComponent } from '../../shared/components/layout/sidebar.component';
import { SidebarGroupComponent, SidebarGroupLabelComponent } from '../../shared/components/layout/sidebar.component';
import { ZardSkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ZardButtonComponent } from '../../shared/components/button/button.component';
import { ZardIconComponent } from '../../shared/components/icon/icon.component';
import { HeaderComponent } from '../../shared/components/layout/header.component';
import { Category } from '@shared/models/category';
import { CategoriesSideBar } from '@shared/components/categories-side-bar/categories-side-bar';
import { categories } from 'src/app/mock-data/categories';
import { ZardInputDirective } from '../../shared/components/input/input.directive';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '@shared/models/product';
import { debounceTime, switchMap } from 'rxjs';
import { ZardBreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';

@Component({
  selector: 'app-products',
  imports: [
    ProductCard,
    ZardPaginationModule,
    FormsModule,
    ContentComponent,
    LayoutComponent,
    CommonModule,
    SidebarComponent,
    SidebarGroupComponent,
    SidebarGroupLabelComponent,
    ZardSkeletonComponent,
    ZardButtonComponent,
    ZardIconComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesSideBar,
    ZardInputDirective,
    ReactiveFormsModule,
    ZardBreadcrumbModule,
  ],
  providers: [ProductService],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  selectedCategory: Category | null = null;
  products: Product[] = [];
  readonly categories: Category[] = categories;
  searchControl = new FormControl();
  
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.products = [];
      }
    });
  }

  private initSearchForm(): void {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      switchMap(value => {
        const searchTerm = (value || '').trim();
        if (searchTerm === '') {
          if (this.selectedCategory) {
            return this.productService.filterByCategory(this.selectedCategory);
          }
          return this.productService.getAll();
        }
        return this.productService.searchByName(value); 
      })
    )
    .subscribe(products => {
      this.products = products;
    });
  }

  onSelectedCategory(category: Category): void {
    this.selectedCategory = category;
    this.productService.filterByCategory(category).subscribe(products => {
      this.products = products;
    });
  }

  onClearSearch(): void {
    this.searchControl.reset();
    this.selectedCategory = null;
    this.loadProducts();
  }
}
