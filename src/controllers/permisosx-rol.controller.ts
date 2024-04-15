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
import {RolxPermisos} from '../models';
import {RolxPermisosRepository} from '../repositories';

export class PermisosxRolController {
  constructor(
    @repository(RolxPermisosRepository)
    public rolxPermisosRepository : RolxPermisosRepository,
  ) {}

  @post('/rolxPermiso')
  @response(200, {
    description: 'RolxPermisos model instance',
    content: {'application/json': {schema: getModelSchemaRef(RolxPermisos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolxPermisos, {
            title: 'NewRolxPermisos',
            exclude: ['_id'],
          }),
        },
      },
    })
    rolxPermisos: Omit<RolxPermisos, '_id'>,
  ): Promise<RolxPermisos> {
    return this.rolxPermisosRepository.create(rolxPermisos);
  }

  @get('/rolxPermiso/count')
  @response(200, {
    description: 'RolxPermisos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RolxPermisos) where?: Where<RolxPermisos>,
  ): Promise<Count> {
    return this.rolxPermisosRepository.count(where);
  }

  @get('/rolxPermiso')
  @response(200, {
    description: 'Array of RolxPermisos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RolxPermisos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RolxPermisos) filter?: Filter<RolxPermisos>,
  ): Promise<RolxPermisos[]> {
    return this.rolxPermisosRepository.find(filter);
  }

  @patch('/rolxPermiso')
  @response(200, {
    description: 'RolxPermisos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolxPermisos, {partial: true}),
        },
      },
    })
    rolxPermisos: RolxPermisos,
    @param.where(RolxPermisos) where?: Where<RolxPermisos>,
  ): Promise<Count> {
    return this.rolxPermisosRepository.updateAll(rolxPermisos, where);
  }

  @get('/rolxPermiso/{id}')
  @response(200, {
    description: 'RolxPermisos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RolxPermisos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RolxPermisos, {exclude: 'where'}) filter?: FilterExcludingWhere<RolxPermisos>
  ): Promise<RolxPermisos> {
    return this.rolxPermisosRepository.findById(id, filter);
  }

  @patch('/rolxPermiso/{id}')
  @response(204, {
    description: 'RolxPermisos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolxPermisos, {partial: true}),
        },
      },
    })
    rolxPermisos: RolxPermisos,
  ): Promise<void> {
    await this.rolxPermisosRepository.updateById(id, rolxPermisos);
  }

  @put('/rolxPermiso/{id}')
  @response(204, {
    description: 'RolxPermisos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rolxPermisos: RolxPermisos,
  ): Promise<void> {
    await this.rolxPermisosRepository.replaceById(id, rolxPermisos);
  }

  @del('/rolxPermiso/{id}')
  @response(204, {
    description: 'RolxPermisos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rolxPermisosRepository.deleteById(id);
  }
}
