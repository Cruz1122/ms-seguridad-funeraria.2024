import {Model, model, property} from '@loopback/repository';

@model()
export class PermisosRolxPermisos extends Model {
  @property({
    type: 'string',
    required: true,
  })
  token: string;

  @property({
    type: 'string',
    required: true,
  })
  idPermisos: string;

  @property({
    type: 'string',
    required: true,
  })
  accion: string;


  constructor(data?: Partial<PermisosRolxPermisos>) {
    super(data);
  }
}

export interface PermisosRolxPermisosRelations {
  // describe navigational properties here
}

export type PermisosRolxPermisosWithRelations = PermisosRolxPermisos & PermisosRolxPermisosRelations;
