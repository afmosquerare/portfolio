import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  viewChild,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

@Component({
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HomePage implements OnInit, AfterViewInit {
  private title = viewChild.required<ElementRef>('heroTitle');
  private subtitle = viewChild.required<ElementRef>('heroSubtitle');
  private buttons = viewChildren<ElementRef>('heroButton');
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    gsap.registerPlugin(SplitText);
    document.fonts.ready.then(() => {
      gsap.set(this.title().nativeElement, { opacity: 1 });

      const splitTitle = SplitText.create(this.title().nativeElement, {
        type: 'words',
        wordsClass: 'word++',
      });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(splitTitle.words, {
          y: -200,
          opacity: 0,
          rotation: 'random(-80, 80)',
          stagger: 0.2,
          duration: 1.2,
          ease: 'back',
        })
        .from(this.subtitle().nativeElement, { opacity: 0, y: 40, duration: 0.6 }, '-=0.3')
        .from(
          this.buttons().map((b) => b.nativeElement),
          { opacity: 0, stagger: 0.2, duration: 1 },
        );
    });
  }
}
