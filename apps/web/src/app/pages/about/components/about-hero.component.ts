import { Component } from '@angular/core';

@Component({
  selector: 'about-hero',
  standalone: true,
  template: `
    <header class="mb-8">
      <div class="flex justify-between items-end mb-4">
        <h1 class="text-7xl md:text-8xl font-extrabold tracking-tighter text-base-content leading-none">
          About
        </h1>
        <div class="flex items-center gap-4 pb-2 pr-2">
          <a href="https://linkedin.com/in/afmosquerare" target="_blank"
            class="text-base-content/60 hover:text-primary transition-colors hover:scale-110 duration-200"
            aria-label="LinkedIn">
            <span class="icon-[mdi--linkedin] text-4xl"></span>
          </a>
          <a href="https://github.com/afmosquerare" target="_blank"
            class="text-base-content/60 hover:text-primary transition-colors hover:scale-110 duration-200"
            aria-label="GitHub">
            <span class="icon-[mdi--github] text-4xl"></span>
          </a>
        </div>
      </div>
      <p class="text-base-content/60 text-xl font-light leading-relaxed ">
        My name is Andrés Rengifo and I'm a full-stack software developer from Medellín, Colombia, with experience
        shipping scalable and user-centered applications.
      </p>
    </header>

    <section class="mb-14 grid gap-6 items-start">
      <div class="md:col-span-2 space-y-4 text-base-content/80 text-lg leading-relaxed">
        <p>
          I'm currently studying IT Engineering and actively looking for my next role—whether it's remote, hybrid, or
          on-site. Specialized in <strong>Angular</strong> and <strong>.NET Core</strong>, I am passionate about creating
          efficient, clean solutions and always strive to apply SOLID principles in every line of code.
        </p>
        <p>
          Outside of code, I enjoy playing basketball, exploring hiking trails, and playing video games. Lately, I've been
          dedicating most of my time to improving my software engineering skills and training on the court.
        </p>
      </div>
      <div class="flex items-start">
        <a href="/cv.pdf" target="_blank"
          class="btn btn-primary text-white rounded-full font-bold w-full sm:w-auto hover:scale-105 ">
          <span class="icon-[lucide--download] text-xl"></span>
          Download CV
        </a>
      </div>
    </section>
  `
})
export class AboutHeroComponent { }
