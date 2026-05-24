import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { NotifierService } from '@shared/services/notifier.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html'
})
export class Auth {
  private router = inject(Router);
  private authService = inject(AuthService);
  private notifierService = inject(NotifierService);

  username = signal('');
  password = signal('');
  isLoading = signal(false);

  login(event: Event) {
    event.preventDefault();
    if (!this.username() || !this.password()) return;

    this.isLoading.set(true);
    this.authService.login({ username: this.username(), password: this.password() }).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe((res) => {
      this.notifierService.success('Welcome back!');
      this.router.navigate(['/']);
    });
  }
}
