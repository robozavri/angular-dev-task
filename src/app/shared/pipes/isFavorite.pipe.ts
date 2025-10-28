import { inject, Pipe, PipeTransform } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Product } from '../models/product';

// need refactor to use async pipe. it need performance improvement. need to use signals
@Pipe({ name: 'isFavorite', standalone: true })
export class IsFavoritePipe implements PipeTransform {
    private favoritesService = inject(FavoritesService);

   transform(product: Product): boolean {
    return this.favoritesService.isFavorite(product);
   }
}
