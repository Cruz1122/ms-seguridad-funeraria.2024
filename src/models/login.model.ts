import {Entity, belongsTo, model, property} from '@loopback/repository';
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
  })
  reCaptchaResultado?: boolean;

  @property({
    type: 'string',
  })
  direccionIp?: string;

  @property({
    type: 'string',
  })
  token?: string;

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
