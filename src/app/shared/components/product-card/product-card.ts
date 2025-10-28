import { Component, input, output } from '@angular/core';
import { Product } from '@shared/models/product';
import { ZardButtonComponent } from '../button/button.component';
import { ZardCardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { ZardAvatarComponent } from '../avatar/avatar.component';
import { RouterLink } from '@angular/router';
import { ZardIconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-product-card',
  imports: [
    ZardAvatarComponent,
    ZardButtonComponent,
    ZardCardComponent,
    CommonModule,
    RouterLink,
    ZardIconComponent,
  ],
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly addFavorite = output<Product>();

  onAddFavorite(product: Product): void {
    this.addFavorite.emit(product);
  }
}
