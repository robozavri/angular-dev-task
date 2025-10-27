import { Component } from '@angular/core';
import { ZardPaginationModule } from '../../shared/components/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { ContentComponent } from '../../shared/components/layout/content.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { products } from '../../mock-data/products';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { CommonModule } from '@angular/common';
// import { FooterComponent } from '../../shared/components/layout/footer.component';
// import { HeaderComponent } from '../../shared/components/layout/header.component';
import { SidebarComponent } from '../../shared/components/layout/sidebar.component';

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
    // FooterComponent, 
    // HeaderComponent,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  protected currentPage = 2;
  readonly products = products;
}
