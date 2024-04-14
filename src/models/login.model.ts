import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Login extends Entity {
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
  codigo2FA: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoCodigo: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  reCaptchaResultado: boolean;

  @property({
    type: 'string',
    required: true,
  })
  direccionIp: string;

  @property({
    type: 'string',
    required: true,
  })
  token: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoToken: boolean;

  @belongsTo(() => Usuario, {name: 'usuario'})
  idUsuario: string;

  constructor(data?: Partial<Login>) {
    super(data);
  }
}

export interface LoginRelations {
  // describe navigational properties here
}

export type LoginWithRelations = Login & LoginRelations;
