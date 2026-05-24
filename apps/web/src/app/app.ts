import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifierComponent } from '@notifications/notifier';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotifierComponent],
  template: `
  <router-outlet/> 
  <notifier/>
  `,
})
export class App {
  protected readonly title = signal('web');
}