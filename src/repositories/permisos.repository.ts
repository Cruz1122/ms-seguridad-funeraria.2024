import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Permisos, PermisosRelations} from '../models';

export class PermisosRepository extends DefaultCrudRepository<
  Permisos,
  typeof Permisos.prototype._id,
  PermisosRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(Permisos, dataSource);
  }
}
