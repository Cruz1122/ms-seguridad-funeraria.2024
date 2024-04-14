import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistroAcciones,
  Usuario,
} from '../models';
import {RegistroAccionesRepository} from '../repositories';

export class RegistroAccionesUsuarioController {
  constructor(
    @repository(RegistroAccionesRepository)
    public registroAccionesRepository: RegistroAccionesRepository,
  ) { }

  @get('/registro-acciones/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to RegistroAcciones',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof RegistroAcciones.prototype._id,
  ): Promise<Usuario> {
    return this.registroAccionesRepository.usuario(id);
  }
}
