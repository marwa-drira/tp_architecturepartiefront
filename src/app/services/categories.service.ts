import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // Url du service web de gestion de Categories
  // commune pour toutes les méthodes
  urlHote = "http://localhost:9999/categories/";
  constructor(private http: HttpClient) { }
  getCategories(filter: object): Observable<Array<Categorie>> {
    let entries = Object.entries(filter);
    let hasFilter = false;
    let url = this.urlHote;
    entries.map(([key, val]) => {
      if (val && hasFilter) {
        url += '&' + key + '=' + val;
      } else if (val) {
        hasFilter = true;
        url += '?' + key + '=' + val;
      }
    });
    return this.http.get<Array<Categorie>>(url);
  }
  deleteCategorie(idC: number | undefined) {
    return this.http.delete(this.urlHote + idC);
  }
  addCategorie(nouveau: Categorie) {
    return this.http.post<Array<Categorie>>(this.urlHote, nouveau);
  }
  updateCategorie(idP: number | undefined, nouveau: Categorie) {
    return this.http.put(this.urlHote + idP, nouveau);
  }
}