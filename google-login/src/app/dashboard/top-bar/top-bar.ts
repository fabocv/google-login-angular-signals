import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="top-bar">
      <div class="logo">Mi Aplicación</div>

      <div class="user-info">
        @if (user()) {
          <span class="user-name">Hola, {{ user()!.name }}</span>
        }

        <button 
          (click)="onLogout()" 
          [disabled]="isLoading()"
          class="logout-button"
        >
          @if (isLoading()) {
            Cerrando...
          } @else {
            Cerrar Sesión
          }
        </button>
      </div>
    </header>
  `,
  styles: `
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background-color: #3f51b5; /* Color primario de ejemplo */
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .user-name {
      font-size: 1rem;
    }
    .logout-button {
      padding: 8px 15px;
      border: 1px solid white;
      border-radius: 4px;
      background-color: transparent;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .logout-button:hover:not([disabled]) {
      background-color: #536dfe; /* Un tono más claro al pasar el mouse */
    }
    .logout-button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `
})
export class TopBar {
  // Inyección del servicio
  private authService = inject(AuthService);

  // Acceso a las signals del servicio
  public user = this.authService.user;
  public isLoading = this.authService.isLoading;

  /**
   * Llama al método de logout del AuthService.
   */
  onLogout(): void {
    // La lógica de limpieza de estado y redirección está encapsulada en el servicio.
    this.authService.logout();
  }
}