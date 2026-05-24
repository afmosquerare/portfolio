import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { NotifierService } from '@notifications/notifier.service';
import { ErrorMessageComponent } from '@app/shared/components/error-message/error.message.component';
import { FormUtils } from '@utils/form.utils';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  templateUrl: './contact.page.html',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent]
})
export default class ContactPage {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private notifier = inject(NotifierService);
  public langService = inject(LanguageService);

  isSubmitting = signal(false);

  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    body: ['', [Validators.required, Validators.minLength(10)]],
    website_url: ['']
  });

  isValidField(field: string) {
    return FormUtils.isValidField(this.contactForm, field);
  }

  openEmail(event: Event) {
    event.preventDefault();
    const user = 'andresm.rengifo';
    const domain = 'gmail.com';
    window.location.href = `mailto:${user}@${domain}`;
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const { name, email, body, website_url: websiteUrl } = this.contactForm.getRawValue();

    try {
      await firstValueFrom(this.messageService.sendMessage({ name, email, body, websiteUrl }));
      this.notifier.success("Message sent successfully! I'll get back to you soon.");
      this.contactForm.reset();
    } catch (error) {
      this.notifier.error("Oops! Something went wrong. Please try again or use direct email.");
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
