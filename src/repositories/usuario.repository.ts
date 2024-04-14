import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Rol, RegistroAcciones} from '../models';
import {RolRepository} from './rol.repository';
import {RegistroAccionesRepository} from './registro-acciones.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype._id,
  UsuarioRelations
> {

  public readonly rol: BelongsToAccessor<Rol, typeof Usuario.prototype._id>;

  public readonly registroAcciones: HasManyRepositoryFactory<RegistroAcciones, typeof Usuario.prototype._id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('RegistroAccionesRepository') protected registroAccionesRepositoryGetter: Getter<RegistroAccionesRepository>,
  ) {
    super(Usuario, dataSource);
    this.registroAcciones = this.createHasManyRepositoryFactoryFor('registroAcciones', registroAccionesRepositoryGetter,);
    this.registerInclusionResolver('registroAcciones', this.registroAcciones.inclusionResolver);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
}
