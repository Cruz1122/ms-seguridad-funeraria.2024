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
import {Permisos} from '../models';
import {PermisosRepository} from '../repositories';

export class PermisosController {
  constructor(
    @repository(PermisosRepository)
    public permisosRepository : PermisosRepository,
  ) {}

  @post('/permiso')
  @response(200, {
    description: 'Permisos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Permisos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {
            title: 'NewPermisos',
            exclude: ['_id'],
          }),
        },
      },
    })
    permisos: Omit<Permisos, '_id'>,
  ): Promise<Permisos> {
    return this.permisosRepository.create(permisos);
  }

  @get('/permiso/count')
  @response(200, {
    description: 'Permisos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Permisos) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.permisosRepository.count(where);
  }

  @get('/permiso')
  @response(200, {
    description: 'Array of Permisos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permisos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Permisos) filter?: Filter<Permisos>,
  ): Promise<Permisos[]> {
    return this.permisosRepository.find(filter);
  }

  @patch('/permiso')
  @response(200, {
    description: 'Permisos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {partial: true}),
        },
      },
    })
    permisos: Permisos,
    @param.where(Permisos) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.permisosRepository.updateAll(permisos, where);
  }

  @get('/permiso/{id}')
  @response(200, {
    description: 'Permisos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Permisos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Permisos, {exclude: 'where'}) filter?: FilterExcludingWhere<Permisos>
  ): Promise<Permisos> {
    return this.permisosRepository.findById(id, filter);
  }

  @patch('/permiso/{id}')
  @response(204, {
    description: 'Permisos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {partial: true}),
        },
      },
    })
    permisos: Permisos,
  ): Promise<void> {
    await this.permisosRepository.updateById(id, permisos);
  }

  @put('/permiso/{id}')
  @response(204, {
    description: 'Permisos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() permisos: Permisos,
  ): Promise<void> {
    await this.permisosRepository.replaceById(id, permisos);
  }

  @del('/permiso/{id}')
  @response(204, {
    description: 'Permisos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.permisosRepository.deleteById(id);
  }
}
