import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);

  // Acceso directo a la computed signal en el template
  public isLoading = this.authService.isLoading;

  onGoogleLogin() {
    this.authService.googleLogin();
  }
}

// Template (login.component.html)
/*
<button (click)="onGoogleLogin()" [disabled]="isLoading()">
  <span *ngIf="isLoading()">Cargando...</span>
  <span *ngIf="!isLoading()">Iniciar sesión con Google</span>
</button>
*/
