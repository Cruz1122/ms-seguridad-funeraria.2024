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
Rol,
RolxPermisos,
Permisos,
} from '../models';
import {RolRepository} from '../repositories';

export class RolPermisosController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/permisos', {
    responses: {
      '200': {
        description: 'Array of Rol has many Permisos through RolxPermisos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Permisos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Permisos>,
  ): Promise<Permisos[]> {
    return this.rolRepository.permisos(id).find(filter);
  }

  @post('/rols/{id}/permisos', {
    responses: {
      '200': {
        description: 'create a Permisos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Permisos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rol.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {
            title: 'NewPermisosInRol',
            exclude: ['_id'],
          }),
        },
      },
    }) permisos: Omit<Permisos, '_id'>,
  ): Promise<Permisos> {
    return this.rolRepository.permisos(id).create(permisos);
  }

  @patch('/rols/{id}/permisos', {
    responses: {
      '200': {
        description: 'Rol.Permisos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {partial: true}),
        },
      },
    })
    permisos: Partial<Permisos>,
    @param.query.object('where', getWhereSchemaFor(Permisos)) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.rolRepository.permisos(id).patch(permisos, where);
  }

  @del('/rols/{id}/permisos', {
    responses: {
      '200': {
        description: 'Rol.Permisos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Permisos)) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.rolRepository.permisos(id).delete(where);
  }
}
