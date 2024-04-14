import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {RegistroAcciones, RegistroAccionesRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class RegistroAccionesRepository extends DefaultCrudRepository<
  RegistroAcciones,
  typeof RegistroAcciones.prototype._id,
  RegistroAccionesRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof RegistroAcciones.prototype._id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(RegistroAcciones, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
