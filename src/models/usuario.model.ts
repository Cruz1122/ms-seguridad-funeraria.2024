import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Login} from './login.model';
import {RegistroAcciones} from './registro-acciones.model';
import {Rol} from './rol.model';

@model()
export class Usuario extends Entity {
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
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'string',
    required: true,
  })
  lugarResidencia: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
  })
  clave?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @property({
    type: 'string',
    required: true,
  })
  modoRecuperacionCuenta: string;

  @belongsTo(() => Rol, {name: 'rol'})
  idRol: string;

  @hasMany(() => RegistroAcciones, {keyTo: 'idUsuario'})
  registroAcciones: RegistroAcciones[];

  @hasMany(() => Login, {keyTo: 'idUsuario'})
  logins: Login[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
