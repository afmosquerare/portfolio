import { Injectable, signal } from '@angular/core';

export interface ConfirmConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  visible = signal<boolean>(false);
  config = signal<ConfirmConfig | null>(null);

  open(config: ConfirmConfig) {
    this.config.set({
      title: config.title,
      message: config.message,
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
      onConfirm: config.onConfirm,
      onCancel: config.onCancel
    });
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
    this.config.set(null);
  }

  confirm() {
    const current = this.config();
    if (current) {
      current.onConfirm();
    }
    this.close();
  }

  cancel() {
    const current = this.config();
    if (current && current.onCancel) {
      current.onCancel();
    }
    this.close();
  }
}
