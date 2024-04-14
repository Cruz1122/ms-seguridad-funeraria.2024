import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Permisos} from './permisos.model';
import {RolxPermisos} from './rolx-permisos.model';

@model()
export class Rol extends Entity {
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

  @hasMany(() => Usuario, {keyTo: 'idRol'})
  usuarios: Usuario[];

  @hasMany(() => Permisos, {through: {model: () => RolxPermisos, keyFrom: 'idRol', keyTo: 'idPermisos'}})
  permisos: Permisos[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
