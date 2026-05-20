import { Component, input } from '@angular/core';

@Component({
    selector: 'p-project-card',
    templateUrl: 'project-card.component.html',
    standalone: true
})
export class ProjectCardComponent {
    view = input<'grid' | 'list'>('grid');
}