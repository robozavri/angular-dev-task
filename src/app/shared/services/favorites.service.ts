import { Injectable } from '@angular/core';
import { Product } from '@shared/models/product';

@Injectable()
export class FavoritesService {

  getFavorites(): Product['id'][] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  addFavorite(product: Product): void {
    if (!this.isFavorite(product)) {
      const favorites = [...this.getFavorites(), product.id];
      localStorage.setItem('favorites', JSON.stringify(favorites));
      product.isFavorite = true;
    } else {
        product.isFavorite = false;
        this.removeFavorite(product);
    }
  }

  removeFavorite(product: Product): void {
    const favorites = this.getFavorites().filter((id: Product['id']) => id !== product.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  isFavorite(product: Product): boolean {
    return this.getFavorites().some((id: Product['id']) => id === product.id);
  }

  clearFavorites(): void {
    localStorage.removeItem('favorites');
  }
}
