import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs'; 
import { LibrosApiResponse } from './libros.model';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getLibros( 
    page: number,
    recordsPerPage: number
  ): Observable<LibrosApiResponse> { 

    const apiUrl = new URL(this.baseUrl + '/api/libros');

    return this.http.get<LibrosApiResponse>(apiUrl.toString());
  }
}
