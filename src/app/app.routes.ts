import { Routes } from '@angular/router';
import { Products } from './routes/products/products';
import { ProductDetailsComponent } from './routes/product-details/product-detals';
import { FavoritesComponent } from './routes/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Products },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
];
