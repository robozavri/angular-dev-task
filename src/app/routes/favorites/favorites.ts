import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '@shared/services/favorites.service';
import { ProductCard } from '@shared/components/product-card/product-card';
import { Product } from '@shared/models/product';
import { ProductService } from '@shared/services/product.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-favorites-component',
  standalone: true,
  imports: [
    ProductCard,
    SharedModule
],
  providers: [
    ProductService,
    FavoritesService
  ],
  templateUrl: './favorites.html',
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private productService: ProductService,
) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const productIds: Product['id'][] = this.favoritesService.getFavorites();
    this.productService.getProductsByIds(productIds).subscribe((products) => {
      this.favorites = products;
    });
  }

  removeFavorite(product: Product): void {
    this.favoritesService.removeFavorite(product);
    this.loadFavorites();
  }
}
