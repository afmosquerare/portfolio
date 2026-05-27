import { Component, input } from '@angular/core';

@Component({
  selector: 'p-project-card-skeleton',
  standalone: true,
  template: `
<div class="group bg-transparent border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 flex"
  [class.flex-col]="true" [class.md:flex-row]="view() === 'list'">
  <!-- Image Skeleton -->
  <div class="relative overflow-hidden shrink-0 border-white/5" [class.w-full]="true"
    [class.md:w-2/5]="view() === 'list'" [class.border-b]="view() === 'grid'" [class.md:border-b-0]="view() === 'list'"
    [class.md:border-r]="view() === 'list'" [class.aspect-[16/10]]="view() === 'grid'">
    <div class="skeleton w-full h-full rounded-none opacity-20"></div>
  </div>
  
  <div class="p-6 md:p-8 grow flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2 mb-2">
      <div class="skeleton h-6 w-16 rounded-full opacity-30"></div>
      <div class="skeleton h-6 w-20 rounded-full opacity-30"></div>
      <div class="skeleton h-6 w-14 rounded-full opacity-30"></div>
    </div>
    
    <div class="skeleton h-8 w-3/4 rounded-lg mb-1 opacity-40"></div>
    
    <div class="space-y-2 mb-4">
      <div class="skeleton h-4 w-full rounded-lg opacity-20"></div>
      <div class="skeleton h-4 w-full rounded-lg opacity-20"></div>
      <div class="skeleton h-4 w-2/3 rounded-lg opacity-20"></div>
    </div>

    <div class="skeleton h-4 w-24 rounded-lg mb-6 opacity-30"></div>
    
    <div class="mt-auto flex flex-col lg:flex-row gap-3">
      <div class="skeleton h-12 flex-1 rounded-lg opacity-20"></div>
      <div class="skeleton h-12 flex-1 rounded-lg opacity-20"></div>
    </div>
  </div>
</div>
  `
})
export class ProjectCardSkeletonComponent {
  view = input<'grid' | 'list'>('grid');
}
