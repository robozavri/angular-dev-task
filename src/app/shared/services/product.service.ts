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

  getProductsByIds(ids: Product['id'][]): Observable<Product[]> {
    return of(products.filter(product => ids.includes(product.id)));
  }

  getProductById(id: Product['id']): Observable<Product | undefined> {
    return of(products.find(product => product.id === Number(id)));
  }

  filterByCategory(category: Category): Observable<Product[]> {
    const filtered = products.filter(product => product.category === category.name);
    return of(filtered);
  }

  searchByName(productName: string): Observable<Product[]>{
    const text = productName.toLowerCase().trim();
    const filtered = products.filter(product => 
      product.name.toLowerCase().trim().includes(text) 
      ||
      product.price.toString().toLowerCase().trim().includes(text)
      ||
      product.category.toLowerCase().trim().includes(text)
      ||
      product.description.toLowerCase().trim().includes(text)
    );
    return of(filtered);
  }
}
