import { Component, OnInit } from '@angular/core';
import { ZardPaginationModule } from '../../shared/components/pagination/pagination.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { SidebarComponent } from '../../shared/components/layout/sidebar.component';
import { Category } from '@shared/models/category';
import { CategoriesSideBar } from '@shared/components/categories-side-bar/categories-side-bar';
import { categories } from 'src/app/mock-data/categories';
import { ZardInputDirective } from '../../shared/components/input/input.directive';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '@shared/models/product';
import { debounceTime, switchMap } from 'rxjs';
import { FavoritesService } from '@shared/services/favorites.service';
import { toast } from 'ngx-sonner';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-products',
  imports: [
    ProductCard,
    ZardPaginationModule,
    FormsModule,
    SidebarComponent,
    CategoriesSideBar,
    ZardInputDirective,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [ProductService, FavoritesService],
  templateUrl: './products.html',
})
export class Products implements OnInit {

  selectedCategory: Category | null = null;
  products: Product[] = [];
  readonly categories: Category[] = categories;
  searchControl = new FormControl();
  
  constructor(
    private productService: ProductService,
    private favoritesService: FavoritesService,
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

  onAddFavorite(product: Product): void {
    this.favoritesService.addFavorite(product);
    toast('Product added to favorites', {
      description: product.name,
    });
  }
}
