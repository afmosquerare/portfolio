import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmComponent } from './shared/components/confirm.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmComponent],
  template: `
    <router-outlet></router-outlet>
    <confirm-dialog></confirm-dialog>
  `,
})
export class App { }
