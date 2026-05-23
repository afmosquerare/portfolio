import { Technology } from './technology.model';

export interface ProjectTranslation {
  languageCode: string;
  title: string;
  description: string;
  shortDescription?: string;
}

export interface Project {
  id: number;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  technologies: Technology[];
  translations: ProjectTranslation[];
}

export interface CreateProjectRequest {
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  order?: number;
  isVisible?: boolean;
  projectTranslations: ProjectTranslation[];
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {}
