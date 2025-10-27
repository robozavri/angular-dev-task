import { Component, input } from '@angular/core';
import { IProduct } from '@shared/models/product';
import { ZardButtonComponent } from '../button/button.component';
import { ZardCardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { ZardAvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-product-card',
  imports: [ZardAvatarComponent, ZardButtonComponent, ZardCardComponent, CommonModule],
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input<IProduct>();
}
