// src/app/auth/auth.service.ts
import { Injectable, computed, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

// Definición simple del estado del usuario (User)
interface User {
  id: string;
  name: string;
  email: string;
  // Otros datos
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 1. Signals para el estado (State Management)
  private readonly _user: WritableSignal<User | null> = signal(null);
  private readonly _isAuthenticated: WritableSignal<boolean> = signal(false);
  private readonly _isLoading: WritableSignal<boolean> = signal(false);

  // 2. Computed Signals para exponer el estado
  public readonly user = this._user.asReadonly();
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();

  // El token de acceso se almacena de forma segura (por ejemplo, en memoria para SPA o usando cookies HTTP-Only)
  // Para la comunicación con Express, a menudo se usa un JWT almacenado en una Cookie HTTP-Only gestionada por Express.
  // Aquí usaremos una Signal para la existencia del token (si usas un approach in-memory/localStorage temporal)
  private readonly _accessToken = signal<string | null>(null);
  public readonly hasAccessToken = computed(() => !!this._accessToken());


  private readonly EXPRESS_API_URL = 'http://localhost:3000/api/auth'; // Reemplaza con tu URL de Express
  private readonly GOOGLE_CLIENT_ID = environment.googleClientId;  //YOUR GOOGLE ID CLIENT
  constructor(private http: HttpClient, private router: Router) {
    this.checkInitialAuthStatus();
  }

  /**
   * Genera la URL de Google para iniciar el flujo de PKCE.
   * La generación del 'code_verifier' y 'code_challenge' (para PKCE)
   * DEBERÍA realizarse aquí y almacenarse temporalmente (e.g., sessionStorage).
   */
  public googleLogin() {
    // 1. Generar PKCE (code_verifier y code_challenge)
    // Usar librerías como 'angular-oauth2-oidc' simplifica esto y el flujo OIDC.

    // 2. Redirigir al usuario al endpoint de autorización de Google
    const authUrl = this.buildGoogleAuthUrl();
    window.location.href = authUrl;
  }

  /**
   * Función que maneja la respuesta de Google (el 'código' de autorización)
   * que se recibe en la URL de redirección.
   * Patrón de diseño: Memento (Almacenar temporalmente el estado para el intercambio)
   */
  public async handleAuthCallback(code: string): Promise<void> {
    this._isLoading.set(true);
    try {
      // 1. Obtener el 'code_verifier' almacenado para PKCE (Opcional si usas librerías)

      // 2. Intercambiar el código con tu servidor Express
      // Tu servidor Express es el encargado de:
      // a) Recibir el 'code' y el 'code_verifier' (PKCE).
      // b) Intercambiar el 'code' con Google para obtener el Access/ID/Refresh Token.
      // c) Crear una sesión de usuario en tu BD.
      // d) Enviar de vuelta a Angular un JWT (en cookie HTTP-Only, preferiblemente) y los datos básicos del usuario.

      const response = await this.http.post<{ user: User }>(
        `${this.EXPRESS_API_URL}/google/callback`,
        { code /*, codeVerifier: '...' */ }
      ).toPromise();

      if (response && response.user) {
        this._user.set(response.user);
        this._isAuthenticated.set(true);
        // Si Express te devuelve un token para usar en el front (NO recomendado), lo almacenarías aquí:
        // this._accessToken.set(response.token);
        this.router.navigate(['/dashboard']); // Redirigir al usuario
      }
    } catch (error) {
      console.error('Error durante el intercambio de código:', error);
      this.logout();
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Cierra la sesión del usuario.
   */
  public logout() {
    this._isLoading.set(true);
    // 1. Llamar al endpoint de Express para borrar la sesión/cookie (logout)
    this.http.post(`${this.EXPRESS_API_URL}/logout`, {}).subscribe({
      next: () => {
        this._user.set(null);
        this._isAuthenticated.set(false);
        this._accessToken.set(null);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        // Aún si falla la llamada al server, limpiar el estado local
        this._user.set(null);
        this._isAuthenticated.set(false);
        this._accessToken.set(null);
        this.router.navigate(['/login']);
      }
    }).add(() => this._isLoading.set(false));
  }

  // Comprobar el estado de autenticación al iniciar la app
  private checkInitialAuthStatus() {
    // Aquí puedes llamar a un endpoint de Express '/me'
    // para verificar si el usuario tiene una sesión activa (ej: cookie HTTP-Only válida).
    this._isLoading.set(true);
    this.http.get<User>(`${this.EXPRESS_API_URL}/me`).subscribe({
      next: (user) => {
        this._user.set(user);
        this._isAuthenticated.set(true);
      },
      error: () => {
        this.logout(); // Limpiar si la verificación falla
      }
    }).add(() => this._isLoading.set(false));
  }

  private buildGoogleAuthUrl(): string {
    // Implementación detallada de la URL de redirección de Google
    // con 'client_id', 'redirect_uri', 'response_type=code', 'scope', 'state', y 'code_challenge'
    // ...
    return 'URL_DE_AUTORIZACION_DE_GOOGLE';
  }
}