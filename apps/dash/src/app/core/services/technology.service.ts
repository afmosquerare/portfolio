import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Technology, CreateTechnologyRequest, UpdateTechnologyRequest } from '@core/models/technology.model';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/technologies`;

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.apiUrl);
  }

  getTechnologyById(id: number): Observable<Technology> {
    return this.http.get<Technology>(`${this.apiUrl}/${id}`);
  }

  createTechnology(technology: CreateTechnologyRequest): Observable<Technology> {
    return this.http.post<Technology>(this.apiUrl, technology);
  }

  updateTechnology(id: number, technology: UpdateTechnologyRequest): Observable<Technology> {
    return this.http.patch<Technology>(`${this.apiUrl}/${id}`, technology);
  }

  deleteTechnology(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
