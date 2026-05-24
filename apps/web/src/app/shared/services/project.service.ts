import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable, map } from 'rxjs';

export interface Project {
  id: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  imageUrl?: string;
  sourceCodeUrl?: string;
  liveDemoUrl?: string;
  isVisible: boolean;
  technologies?: { name: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/projects`;

  getProjects(): Observable<Project[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(projects => projects.map(p => {
        const enTranslation = p.translations?.find((t: any) => t.languageCode === 'en');
        const esTranslation = p.translations?.find((t: any) => t.languageCode === 'es');
        
        return {
          ...p,
          titleEn: enTranslation?.title || 'No Title',
          titleEs: esTranslation?.title || 'Sin Título',
          descriptionEn: enTranslation?.description || 'No description available.',
          descriptionEs: esTranslation?.description || 'No hay descripción disponible.',
          sourceCodeUrl: p.githubUrl,
          liveDemoUrl: p.demoUrl
        };
      }))
    );
  }
}
