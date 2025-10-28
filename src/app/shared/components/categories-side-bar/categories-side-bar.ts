import { Component, input, output } from '@angular/core';
import { ZardButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Category } from '@shared/models/category';
import { ZardPaginationModule } from '../pagination/pagination.module';
import { SidebarGroupComponent, SidebarGroupLabelComponent } from '../layout/sidebar.component';

@Component({
  selector: 'app-categories-side-bar',
  imports: [
    ZardPaginationModule, 
    CommonModule, 
    SidebarGroupComponent, 
    SidebarGroupLabelComponent,
    ZardButtonComponent,
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
