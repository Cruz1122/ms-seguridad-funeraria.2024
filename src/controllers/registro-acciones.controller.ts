import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RegistroAcciones} from '../models';
import {RegistroAccionesRepository} from '../repositories';

export class RegistroAccionesController {
  constructor(
    @repository(RegistroAccionesRepository)
    public registroAccionesRepository : RegistroAccionesRepository,
  ) {}

  @post('/registroAccion')
  @response(200, {
    description: 'RegistroAcciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroAcciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAcciones, {
            title: 'NewRegistroAcciones',
            exclude: ['_id'],
          }),
        },
      },
    })
    registroAcciones: Omit<RegistroAcciones, '_id'>,
  ): Promise<RegistroAcciones> {
    return this.registroAccionesRepository.create(registroAcciones);
  }

  @get('/registroAccion/count')
  @response(200, {
    description: 'RegistroAcciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroAcciones) where?: Where<RegistroAcciones>,
  ): Promise<Count> {
    return this.registroAccionesRepository.count(where);
  }

  @get('/registroAccion')
  @response(200, {
    description: 'Array of RegistroAcciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroAcciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroAcciones) filter?: Filter<RegistroAcciones>,
  ): Promise<RegistroAcciones[]> {
    return this.registroAccionesRepository.find(filter);
  }

  @patch('/registroAccion')
  @response(200, {
    description: 'RegistroAcciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAcciones, {partial: true}),
        },
      },
    })
    registroAcciones: RegistroAcciones,
    @param.where(RegistroAcciones) where?: Where<RegistroAcciones>,
  ): Promise<Count> {
    return this.registroAccionesRepository.updateAll(registroAcciones, where);
  }

  @get('/registroAccion/{id}')
  @response(200, {
    description: 'RegistroAcciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroAcciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RegistroAcciones, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroAcciones>
  ): Promise<RegistroAcciones> {
    return this.registroAccionesRepository.findById(id, filter);
  }

  @patch('/registroAccion/{id}')
  @response(204, {
    description: 'RegistroAcciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAcciones, {partial: true}),
        },
      },
    })
    registroAcciones: RegistroAcciones,
  ): Promise<void> {
    await this.registroAccionesRepository.updateById(id, registroAcciones);
  }

  @put('/registroAccion/{id}')
  @response(204, {
    description: 'RegistroAcciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() registroAcciones: RegistroAcciones,
  ): Promise<void> {
    await this.registroAccionesRepository.replaceById(id, registroAcciones);
  }

  @del('/registroAccion/{id}')
  @response(204, {
    description: 'RegistroAcciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.registroAccionesRepository.deleteById(id);
  }
}
