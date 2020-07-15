import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesUrl = 'http://127.0.0.1:4200/api/category/';

  constructor(private http: HttpClient) { }

  getCategories(companyId: string) {
    return this.http.get<Category[]>(this.categoriesUrl + companyId);
  }

  saveCategory(category: Category, companyId: string) {
    return this.http.post<Category[]>(this.categoriesUrl + companyId, category);
  }

  deleteCategory(category: Category, companyId: string) {
    return this.http.request('delete', this.categoriesUrl + companyId, {body: category});

  }
}
