import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Rol, RolRelations, Usuario, Permisos, RolxPermisos} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {RolxPermisosRepository} from './rolx-permisos.repository';
import {PermisosRepository} from './permisos.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype._id,
  RolRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Rol.prototype._id>;

  public readonly permisos: HasManyThroughRepositoryFactory<Permisos, typeof Permisos.prototype._id,
          RolxPermisos,
          typeof Rol.prototype._id
        >;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('RolxPermisosRepository') protected rolxPermisosRepositoryGetter: Getter<RolxPermisosRepository>, @repository.getter('PermisosRepository') protected permisosRepositoryGetter: Getter<PermisosRepository>,
  ) {
    super(Rol, dataSource);
    this.permisos = this.createHasManyThroughRepositoryFactoryFor('permisos', permisosRepositoryGetter, rolxPermisosRepositoryGetter,);
    this.registerInclusionResolver('permisos', this.permisos.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
