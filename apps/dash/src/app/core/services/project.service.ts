import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Project, CreateProjectRequest, UpdateProjectRequest } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/projects`;

  getProjects(technologyId?: number, lang?: string, isVisible?: boolean): Observable<Project[]> {
    let params = new HttpParams();
    if (technologyId) params = params.set('technologyId', technologyId);
    if (lang) params = params.set('lang', lang);
    if (isVisible !== undefined) params = params.set('isVisible', isVisible);

    return this.http.get<Project[]>(this.apiUrl, { params });
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(project: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, project: UpdateProjectRequest): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addTechnology(projectId: number, technologyId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/technologies/${technologyId}`, {});
  }

  removeTechnology(projectId: number, technologyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/technologies/${technologyId}`);
  }

  updateTranslation(projectId: number, lang: string, translation: { title: string; description: string }): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${projectId}/translations/${lang}`, translation);
  }
}
