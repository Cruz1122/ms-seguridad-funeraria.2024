import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {RegistroAcciones, RegistroAccionesRelations} from '../models';

export class RegistroAccionesRepository extends DefaultCrudRepository<
  RegistroAcciones,
  typeof RegistroAcciones.prototype._id,
  RegistroAccionesRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(RegistroAcciones, dataSource);
  }
}
