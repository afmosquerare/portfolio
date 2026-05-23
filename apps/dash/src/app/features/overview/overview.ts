import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProjectService } from '../../core/services/project.service';

import { TechnologyService } from '../../core/services/technology.service';
import { MessageService } from '../../core/services/message.service';

import { RouterLink } from '@angular/router';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { QuickActionComponent } from '../../shared/components/quick-action.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [RouterLink, StatCardComponent, QuickActionComponent],
  templateUrl: './overview.html'
})
export default class Overview implements OnInit {
  projectService = inject(ProjectService);

  technologyService = inject(TechnologyService);
  messageService = inject(MessageService);

  totalProjects = signal<number>(0);

  totalTechnologies = signal<number>(0);
  unreadMessages = signal<number>(0);
  greeting = signal<string>('Welcome back');
  date = signal<string>('');

  statCards = computed(() => [
    { title: 'Total Projects', value: this.totalProjects(), link: '/projects' },
    { title: 'Tech Stack', value: this.totalTechnologies(), link: '/technologies' },
    { title: 'Messages', value: this.unreadMessages(), link: '/messages' }
  ]);

  quickActions = [
    { title: 'New Project', icon: 'icon-[mdi--plus]', link: '/projects', queryParams: { action: 'new' } },
    { title: 'New Technology', icon: 'icon-[mdi--plus]', link: '/technologies', queryParams: { action: 'new' } }
  ];

  ngOnInit() {
    this.updateTime();

    forkJoin({
      projects: this.projectService.getProjects(),
      technologies: this.technologyService.getTechnologies(),
      messages: this.messageService.getMessages()
    }).subscribe(({ projects, technologies, messages }) => {
      this.totalProjects.set(projects.length);
      this.totalTechnologies.set(technologies.length);
      this.unreadMessages.set((messages as any[]).filter(msg => !msg.isRead).length);
    });
  }

  updateTime() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting.set('Good morning');
    else if (hour < 18) this.greeting.set('Good afternoon');
    else this.greeting.set('Good evening');

    this.date.set(new Date().toLocaleDateString('en-US',
      { weekday: 'long', month: 'long', day: 'numeric' }));
  }
}
