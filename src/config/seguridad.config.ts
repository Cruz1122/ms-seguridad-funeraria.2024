export namespace ConfiguracionSeguridad {
  export const claveJWT = process.env.SECRET_PASSWORD_JWT;
  export const permisoUsuarioId = '661c7bf5f735de272419ab97';
  export const listarAccion = 'listar';
  export const editarrAccion = 'editar';
  export const guardarAccion = 'guardar';
  export const eliminarAccion = 'eliminar';
  export const descargarAccion = 'descargar';
  export const mongobdConnectionString = process.env.CONNECTION_STRING_MONGODB;
}
