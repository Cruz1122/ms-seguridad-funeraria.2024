export namespace ConfiguracionNotificaciones {
  export const asunto2fa: string = 'Código de verificación';
  export const asuntoVerificaciónCorreo: string =
    'Verificación de correo electrónico';
  export const claveAsignada: string = 'Asignación de clave';
  export const urlEmail2fa: string = 'http://localhost:5000/email-2fa';
  export const urlSMS2fa: string = 'http://localhost:5000/sms-2fa';
  export const urlValidacionCorreoFrontend =
    'http://localhost:4200/seguridad/validar-hash-usuario-publico';
}
