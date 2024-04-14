import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
import {RolxPermisos} from './rolx-permisos.model';

@model()
export class Permisos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  comentarios?: string;

  @hasMany(() => Rol, {through: {model: () => RolxPermisos, keyFrom: 'idPermisos', keyTo: 'idRol'}})
  rols: Rol[];

  constructor(data?: Partial<Permisos>) {
    super(data);
  }
}

export interface PermisosRelations {
  // describe navigational properties here
}

export type PermisosWithRelations = Permisos & PermisosRelations;
