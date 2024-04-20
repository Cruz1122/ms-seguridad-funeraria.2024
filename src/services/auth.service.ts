import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {RolxPermisosRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(
    @repository(RolxPermisosRepository)
    private repositorioRolxPermiso: RolxPermisosRepository,
  ) {}

  async VerificarPermisoDeUsuarioPorRol(
    idRol: string,
    idPermiso: string,
    accion: string,
  ): Promise<UserProfile | undefined> {
    let rolxPermisos = await this.repositorioRolxPermiso.findOne({
      where: {
        idRol: idRol,
        idPermisos: idPermiso,
      },
    });

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
}
