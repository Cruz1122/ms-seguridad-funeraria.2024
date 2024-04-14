import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  RegistroAcciones,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioRegistroAccionesController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/registro-acciones', {
    responses: {
      '200': {
        description: 'Array of Usuario has many RegistroAcciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistroAcciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<RegistroAcciones>,
  ): Promise<RegistroAcciones[]> {
    return this.usuarioRepository.registroAcciones(id).find(filter);
  }

  @post('/usuarios/{id}/registro-acciones', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistroAcciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAcciones, {
            title: 'NewRegistroAccionesInUsuario',
            exclude: ['_id'],
            optional: ['idUsuario']
          }),
        },
      },
    }) registroAcciones: Omit<RegistroAcciones, '_id'>,
  ): Promise<RegistroAcciones> {
    return this.usuarioRepository.registroAcciones(id).create(registroAcciones);
  }

  @patch('/usuarios/{id}/registro-acciones', {
    responses: {
      '200': {
        description: 'Usuario.RegistroAcciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAcciones, {partial: true}),
        },
      },
    })
    registroAcciones: Partial<RegistroAcciones>,
    @param.query.object('where', getWhereSchemaFor(RegistroAcciones)) where?: Where<RegistroAcciones>,
  ): Promise<Count> {
    return this.usuarioRepository.registroAcciones(id).patch(registroAcciones, where);
  }

  @del('/usuarios/{id}/registro-acciones', {
    responses: {
      '200': {
        description: 'Usuario.RegistroAcciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RegistroAcciones)) where?: Where<RegistroAcciones>,
  ): Promise<Count> {
    return this.usuarioRepository.registroAcciones(id).delete(where);
  }
}
