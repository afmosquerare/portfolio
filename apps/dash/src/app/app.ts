import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifierComponent } from './shared/services/notifier';
import { ConfirmComponent } from './shared/components/confirm.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotifierComponent, ConfirmComponent],
  template: `
    <router-outlet></router-outlet>
    <notifier></notifier>
    <confirm-dialog></confirm-dialog>
  `,
})
export class App { }
