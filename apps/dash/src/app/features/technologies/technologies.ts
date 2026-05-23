import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { finalize } from 'rxjs/operators';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TechnologyService } from '../../core/services/technology.service';
import { Technology } from '../../core/models/technology.model';
import { NotifierService } from '../../shared/services/notifier.service';
import { ConfirmService } from '../../shared/services/confirm.service';
import { PageHeaderComponent } from '../../shared/components/page-header.component';
import { ErrorMessageComponent } from '../../shared/components/error-message.component';
import { ActivatedRoute } from '@angular/router';
import { FormUtils } from '../../shared/utils/form.utils';
import { ModalComponent } from '../../shared/components/modal.component';
import { TableSkeletonComponent } from '../../shared/components/table-skeleton.component';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, ErrorMessageComponent, ModalComponent, TableSkeletonComponent],
  templateUrl: './technologies.html'
})
export default class Technologies implements OnInit {
  technologyService = inject(TechnologyService);
  fb = inject(FormBuilder);
  notifierService = inject(NotifierService);
  confirmService = inject(ConfirmService);
  route = inject(ActivatedRoute);

  modal = viewChild.required<ModalComponent>('modal');
  public formUtils = FormUtils;

  technologiesResource = rxResource({

    stream: () => this.technologyService.getTechnologies()
  });

  isSaving = signal(false);
  editingId = signal<number | null>(null);

  techForm = this.fb.group({
    name: ['', Validators.required]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['action'] === 'new') {
        setTimeout(() => this.openModal(), 100);
      }
    });
  }

  openModal() {
    this.editingId.set(null);
    this.techForm.reset();
    this.modal().open();
  }

  editTechnology(tech: Technology) {
    this.editingId.set(tech.id);
    this.techForm.patchValue({
      name: tech.name
    });
    this.modal().open();
  }

  closeModal() {
    this.modal().close();
  }

  saveTechnology() {
    if (this.techForm.invalid) return;
    this.isSaving.set(true);

    const request = {
      name: this.techForm.value.name!
    };

    if (this.editingId()) {
      this.technologyService.updateTechnology(this.editingId()!, request).pipe(
        finalize(() => this.isSaving.set(false))
      ).subscribe(() => {
        this.technologiesResource.reload();
        this.notifierService.success('Technology updated successfully');
        this.closeModal();
      });
    } else {
      this.technologyService.createTechnology(request).pipe(
        finalize(() => this.isSaving.set(false))
      ).subscribe(() => {
        this.technologiesResource.reload();
        this.notifierService.success('Technology created successfully');
        this.closeModal();
      });
    }
  }

  deleteTechnology(id: number) {
    this.confirmService.open({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this technology? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        this.technologyService.deleteTechnology(id).subscribe(() => {
          this.technologiesResource.reload();
          this.notifierService.success('Technology deleted');
        });
      }
    });
  }
}
