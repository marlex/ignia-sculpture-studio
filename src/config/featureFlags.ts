/**
 * SHOW_PUBLIC_AUTH
 * ----------------
 * Controla la visibilidad de los enlaces de autenticación
 * ("Sign in" / "Entrar", "Dashboard" / "Mi panel", "Sign out" / "Salir")
 * en la navegación pública (Header y Footer).
 *
 * - false: los enlaces quedan ocultos en toda la navegación.
 *          El flujo de auth y el dashboard siguen funcionando con normalidad,
 *          accesibles únicamente vía URL directa (p. ej. /login, /dashboard).
 * - true:  los enlaces vuelven a mostrarse en Header y Footer.
 *
 * Para reactivar el acceso público al login, cambia este único valor a `true`.
 * No es necesario tocar ningún otro archivo.
 */
export const SHOW_PUBLIC_AUTH = false;
