import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@shared/services/product.service';
import { FavoritesService } from '@shared/services/favorites.service';
import { toast } from 'ngx-sonner';
import { SharedModule } from '@shared/shared.module';


@Component({
  selector: 'app-product-details',
  imports: [
    SharedModule
  ],
  providers: [ProductService, FavoritesService],
  templateUrl: './product-details.html',
})
export class ProductDetailsComponent implements OnInit {

    product: Product | undefined;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private favoritesService: FavoritesService,
    ) { }

  ngOnInit(): void {
    this.listeningToParams();
  }

  private listeningToParams(): void {
    this.route.params.subscribe(params => {
        const id = params['id'];
        this.productService.getProductById(id)?.subscribe((product) => {
          this.product = product;
        });
      });
  }

  onAddFavorite(product: Product): void {
    this.favoritesService.addFavorite(product);
    toast('Product added to favorites', {
      description: product.name,
    });
  }
}