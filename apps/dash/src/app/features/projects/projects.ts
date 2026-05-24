import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';
import { TechnologyService } from '../../core/services/technology.service';
import { Project, CreateProjectRequest, UpdateProjectRequest } from '../../core/models/project.model';
import { Technology } from '../../core/models/technology.model';
import { StorageService } from '../../core/services/storage.service';
import { NotifierService } from '../../shared/services/notifier.service';
import { ConfirmService } from '../../shared/services/confirm.service';
import { PageHeaderComponent } from '../../shared/components/page-header.component';
import { ErrorMessageComponent } from '../../shared/components/error-message.component';
import { ActivatedRoute } from '@angular/router';
import { FormUtils } from '../../shared/utils/form.utils';
import { ModalComponent } from '../../shared/components/modal.component';
import { TableSkeletonComponent } from '../../shared/components/table-skeleton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent, ErrorMessageComponent, ModalComponent, TableSkeletonComponent],
  templateUrl: './projects.html'
})
export default class Projects implements OnInit {
  private projectService = inject(ProjectService);
  private storageService = inject(StorageService);
  private fb = inject(FormBuilder);
  private notifierService = inject(NotifierService);
  private technologyService = inject(TechnologyService);
  private confirmService = inject(ConfirmService);
  private route = inject(ActivatedRoute);

  modal = viewChild.required<ModalComponent>('modal');
  public formUtils = FormUtils;

  projectsResource = rxResource({
    stream: () => this.projectService.getProjects()
  });

  technologies = signal<Technology[]>([]);

  isSaving = signal(false);
  isUploading = signal(false);
  editingId = signal<number | null>(null);

  selectedTechIds = signal<number[]>([]);

  projectForm = this.fb.group({
    titleEn: ['', Validators.required],
    titleEs: ['', Validators.required],
    descriptionEn: ['', Validators.required],
    descriptionEs: ['', Validators.required],
    imageUrl: [''],
    githubUrl: [''],
    demoUrl: [''],
    isVisible: [true]
  });

  ngOnInit() {
    this.loadTechnologies();
    this.route.queryParams.subscribe(params => {
      if (params['action'] === 'new') {
        setTimeout(() => this.openModal(), 100);
      }
    });
  }

  loadTechnologies() {
    this.technologyService.getTechnologies().subscribe({
      next: (res) => this.technologies.set(res)
    });
  }

  openModal() {
    this.editingId.set(null);
    this.selectedTechIds.set([]);
    this.projectForm.reset({ isVisible: true });
    this.modal().open();
  }

  editProject(project: Project) {
    this.editingId.set(project.id);
    const enTrans = project.translations?.find((t: any) => t.languageCode === 'en');
    const esTrans = project.translations?.find((t: any) => t.languageCode === 'es');
    this.projectForm.patchValue({
      titleEn: enTrans?.title || '',
      descriptionEn: enTrans?.description || '',
      titleEs: esTrans?.title || '',
      descriptionEs: esTrans?.description || '',
      imageUrl: project.imageUrl || '',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      isVisible: project.isVisible
    });

    this.selectedTechIds.set(project.technologies?.map((t: any) => t.id) || []);

    this.modal().open();
  }

  closeModal() {
    this.projectForm.reset({ isVisible: true });
    this.modal().close();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.isUploading.set(true);
      this.storageService.uploadFile(file).pipe(
        finalize(() => this.isUploading.set(false))
      ).subscribe((url) => {
        this.projectForm.patchValue({ imageUrl: url });
      });
    }
  }

  saveProject() {
    if (this.projectForm.invalid) return;
    this.isSaving.set(true);

    const formValue = this.projectForm.value;
    const request = {
      imageUrl: formValue.imageUrl || undefined,
      githubUrl: formValue.githubUrl || undefined,
      demoUrl: formValue.demoUrl || undefined,
      isVisible: formValue.isVisible || false,
      order: 0,
      projectTranslations: [
        { languageCode: 'en', title: formValue.titleEn!, description: formValue.descriptionEn! },
        { languageCode: 'es', title: formValue.titleEs!, description: formValue.descriptionEs! }
      ]
    };

    if (this.editingId()) {
      const projectId = this.editingId()!;
      this.projectService.updateProject(projectId, request).pipe(finalize(() => this.isSaving.set(false))).subscribe({
        next: (updatedProj) => this.syncTechnologies(projectId, updatedProj),
      });
    } else {
      this.projectService.createProject(request).pipe(finalize(() => this.isSaving.set(false))).subscribe({
        next: (newProj) => this.syncTechnologies(newProj.id, newProj),
      });
    }
  }

  syncTechnologies(projectId: number, projectData: Project) {
    const currentTechIds = projectData.technologies?.map(t => t.id) || [];
    const desiredTechIds = this.selectedTechIds();

    const toAdd = desiredTechIds.filter(id => !currentTechIds.includes(id));
    const toRemove = currentTechIds.filter(id => !desiredTechIds.includes(id));

    const tasks: any[] = [
      ...toAdd.map(techId => this.projectService.addTechnology(projectId, techId)),
      ...toRemove.map(techId => this.projectService.removeTechnology(projectId, techId))
    ];

    if (this.editingId()) {
      const formValue = this.projectForm.value;
      tasks.push(this.projectService.updateTranslation(projectId, 'en', { title: formValue.titleEn!, description: formValue.descriptionEn! }));
      tasks.push(this.projectService.updateTranslation(projectId, 'es', { title: formValue.titleEs!, description: formValue.descriptionEs! }));
    }

    if (tasks.length === 0) {
      this.finishSave();
      return;
    }

    forkJoin(tasks).pipe(finalize(() => this.finishSave())).subscribe();
  }

  finishSave() {
    this.projectsResource.reload();
    if (this.editingId()) {
      this.notifierService.success('Project updated successfully');
    } else {
      this.notifierService.success('Project created successfully');
    }
    this.isSaving.set(false);
    this.closeModal();
  }

  deleteProject(id: number) {
    this.confirmService.open({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this project? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        this.projectService.deleteProject(id).subscribe(() => {
          this.projectsResource.reload();
          this.notifierService.success('Project deleted');
        });
      }
    });
  }

  toggleTechnology(techId: number) {
    const current = this.selectedTechIds();
    if (current.includes(techId)) {
      this.selectedTechIds.set(current.filter(id => id !== techId));
    } else {
      this.selectedTechIds.set([...current, techId]);
    }
  }
}
