import { Component, input, output } from '@angular/core';
import { ZardButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Category } from '@shared/models/category';
import { ZardPaginationModule } from '../pagination/pagination.module';
import { ContentComponent } from '../layout/content.component';
import { LayoutComponent } from '../layout/layout.component';
import { ProductCard } from '../product-card/product-card';
import { FooterComponent } from '../layout/footer.component';
import { SidebarComponent } from '../layout/sidebar.component';
import { SidebarGroupComponent, SidebarGroupLabelComponent } from '../layout/sidebar.component';
import { ZardSkeletonComponent } from '../skeleton/skeleton.component';
import { ZardIconComponent } from '../icon/icon.component';
import { HeaderComponent } from '../layout/header.component';

@Component({
  selector: 'app-categories-side-bar',
  imports: [
    ProductCard, 
    ZardPaginationModule, 
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
    CommonModule
  ],
  templateUrl: './categories-side-bar.html',
})
export class CategoriesSideBar {

  readonly categories = input<Category[]>();
  readonly selectedCategory = output<Category>();
  activeCategory: Category | null = null;

  onCategoryClick(category: Category) {
    this.activeCategory = category;
    this.selectedCategory.emit(category);
  }
}
