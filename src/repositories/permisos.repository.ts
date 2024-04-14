import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Permisos, PermisosRelations, Rol, RolxPermisos} from '../models';
import {RolxPermisosRepository} from './rolx-permisos.repository';
import {RolRepository} from './rol.repository';

export class PermisosRepository extends DefaultCrudRepository<
  Permisos,
  typeof Permisos.prototype._id,
  PermisosRelations
> {

  public readonly rols: HasManyThroughRepositoryFactory<Rol, typeof Rol.prototype._id,
          RolxPermisos,
          typeof Permisos.prototype._id
        >;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('RolxPermisosRepository') protected rolxPermisosRepositoryGetter: Getter<RolxPermisosRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Permisos, dataSource);
    this.rols = this.createHasManyThroughRepositoryFactoryFor('rols', rolRepositoryGetter, rolxPermisosRepositoryGetter,);
    this.registerInclusionResolver('rols', this.rols.inclusionResolver);
  }
}
