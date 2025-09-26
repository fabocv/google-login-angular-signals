import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBar } from '../top-bar/top-bar';

@Component({
  selector: 'app-panel-cliente',
  standalone: true,
  imports: [
    CommonModule,
    TopBar // Importamos el componente TopBar
  ],
  template: `
    <div class="dashboard-layout">
      <app-top-bar />
      
      <main class="dashboard-content">
        <h1>Bienvenido a tu Dashboard</h1>
        <p>Este es el contenido principal y solo es visible si estás autenticado.</p>
        </main>
    </div>
  `,
  styles: `
    .dashboard-layout {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .dashboard-content {
      padding: 20px;
      flex-grow: 1;
      overflow-y: auto;
    }
  `
})
export class PanelCliente {}