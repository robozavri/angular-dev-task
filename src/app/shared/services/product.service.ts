import { Injectable } from '@angular/core';
import { products } from '../../mock-data/products';
import { Product } from '@shared/models/product';
import { Category } from '@shared/models/category';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProductService {

  getAll(): Observable<Product[]> {
    return of(products);
  }

  /**
   * Get products by category
   * @param category - The category to get products for
   * @returns An observable of products that match the category
   */
  filterByCategory(category: Category): Observable<Product[]> {
    const filtered = products.filter(product => product.category === category.name);
    return of(filtered);
  }

  /**
   * Search for products by name
   * @param productName - The name of the product to search for
   * @returns An observable of products that match the search criteria
   */
  searchByName(productName: string): Observable<Product[]>{
    const filtered = products.filter(product => 
      product.name.toLowerCase().trim().includes(productName.toLowerCase().trim())
    );
    return of(filtered);
  }
}
