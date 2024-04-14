import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {RolxPermisos, RolxPermisosRelations} from '../models';

export class RolxPermisosRepository extends DefaultCrudRepository<
  RolxPermisos,
  typeof RolxPermisos.prototype._id,
  RolxPermisosRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(RolxPermisos, dataSource);
  }
}
