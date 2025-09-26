import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  template: '<div>Procesando inicio de sesión...</div>',
  styleUrl: './auth-callback.css'
})
export class AuthCallback {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  ngOnInit() {
    // 1. Extraer el código de autorización de los query parameters
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        // 2. Llamar al servicio para manejar el código y obtener los tokens
        this.authService.handleAuthCallback(code);
      } else {
        // Manejar error (ej. el usuario denegó el acceso)
        console.error('No se recibió código de autorización.');
        // Redirigir al login
      }
    });
  }
}
