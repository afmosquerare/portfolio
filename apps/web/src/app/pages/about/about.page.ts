import { Component } from '@angular/core';
import { AboutHeroComponent } from './components/about-hero.component';
import { AboutExperienceComponent } from './components/about-experience.component';
import { AboutTechStackComponent } from './components/about-tech-stack.component';

@Component({
  templateUrl: './about.page.html',
  standalone: true,
  imports: [AboutHeroComponent, AboutExperienceComponent, AboutTechStackComponent]
})
export default class AboutPage {}
