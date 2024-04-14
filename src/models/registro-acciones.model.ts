import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class RegistroAcciones extends Entity {
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
  tipoAccion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;

  @property({
    type: 'string',
    required: true,
  })
  direccionIp: string;

  @belongsTo(() => Usuario, {name: 'usuario'})
  idUsuario: string;

  constructor(data?: Partial<RegistroAcciones>) {
    super(data);
  }
}

export interface RegistroAccionesRelations {
  // describe navigational properties here
}

export type RegistroAccionesWithRelations = RegistroAcciones & RegistroAccionesRelations;
