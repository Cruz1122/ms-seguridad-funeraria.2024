import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<RegistroAcciones>) {
    super(data);
  }
}

export interface RegistroAccionesRelations {
  // describe navigational properties here
}

export type RegistroAccionesWithRelations = RegistroAcciones & RegistroAccionesRelations;
