import {
  AuthenticationBindings,
  AuthenticationMetadata,
  AuthenticationStrategy,
} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {RolxPermisosRepository} from '../repositories';
import {SeguridadUsuarioService} from '../services';

export class AuthStrategy implements AuthenticationStrategy {
  name: string = 'auth';

  constructor(
    @service(SeguridadUsuarioService)
    private servicioSeguridad: SeguridadUsuarioService,
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata[],
    @repository(RolxPermisosRepository)
    private repositorioRolxPermiso: RolxPermisosRepository,
  ) {}

  /**
   * Autenticación de usuario	frente a una acción en la base de datos
   * @param request solucitud con el token
   * @returns el perfil de usuario, undefined cuando no tiene permiso o un HttpError
   */
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let idRol = this.servicioSeguridad.obtenerRolDesdeToken(token);
      let idPermiso: string = this.metadata[0].options![0];
      let accion: string = this.metadata[0].options![1];
      console.log(this.metadata);

      let rolxPermisos = await this.repositorioRolxPermiso.findOne({
        where: {
          idRol: idRol,
          idPermisos: idPermiso,
        },
      });

      console.log(rolxPermisos);
      console.log('idRol:' + idRol);
      console.log('idPermiso:' + idPermiso);
      console.log('acción:' + accion);

      let continuar: boolean = false;

      if (rolxPermisos) {
        switch (accion) {
          case 'guardar':
            continuar = rolxPermisos.guardar;
            break;
          case 'eliminar':
            continuar = rolxPermisos.eliminar;
            break;
          case 'listar':
            continuar = rolxPermisos.listar;
            break;
          case 'editar':
            continuar = rolxPermisos.editar;
            break;
          case 'descargar':
            continuar = rolxPermisos.descargar;
            break;
          default:
            throw new HttpErrors[401](
              'No es posible ejecutar la acción porque no existe',
            );
        }
        if (continuar) {
          let perfil: UserProfile = Object.assign({
            permitido: 'OK',
          });
          return perfil;
        } else {
          return undefined;
        }
      } else {
        throw new HttpErrors[401](
          'No es posible ejecutar la acción por falta de permisos',
        );
      }
    }

    throw new HttpErrors[401](
      'No es posible ejecutar la acción por falta de un token',
    );
  }
}
