import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {
  Login,
  RegistroAcciones,
  Rol,
  Usuario,
  UsuarioRelations,
} from '../models';
import {LoginRepository} from './login.repository';
import {RegistroAccionesRepository} from './registro-acciones.repository';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype._id,
  UsuarioRelations
> {
  public readonly rol: BelongsToAccessor<Rol, typeof Usuario.prototype._id>;

  public readonly registroAcciones: HasManyRepositoryFactory<
    RegistroAcciones,
    typeof Usuario.prototype._id
  >;

  public readonly login: HasManyRepositoryFactory<
    Login,
    typeof Usuario.prototype._id
  >;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
    @repository.getter('RolRepository')
    protected rolRepositoryGetter: Getter<RolRepository>,
    @repository.getter('RegistroAccionesRepository')
    protected registroAccionesRepositoryGetter: Getter<RegistroAccionesRepository>,
    @repository.getter('LoginRepository')
    protected loginRepositoryGetter: Getter<LoginRepository>,
  ) {
    super(Usuario, dataSource);
    this.login = this.createHasManyRepositoryFactoryFor(
      'logins',
      loginRepositoryGetter,
    );
    this.registerInclusionResolver('logins', this.login.inclusionResolver);
    this.registroAcciones = this.createHasManyRepositoryFactoryFor(
      'registroAcciones',
      registroAccionesRepositoryGetter,
    );
    this.registerInclusionResolver(
      'registroAcciones',
      this.registroAcciones.inclusionResolver,
    );
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
}
