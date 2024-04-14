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
Permisos,
RolxPermisos,
Rol,
} from '../models';
import {PermisosRepository} from '../repositories';

export class PermisosRolController {
  constructor(
    @repository(PermisosRepository) protected permisosRepository: PermisosRepository,
  ) { }

  @get('/permisos/{id}/rols', {
    responses: {
      '200': {
        description: 'Array of Permisos has many Rol through RolxPermisos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.permisosRepository.rols(id).find(filter);
  }

  @post('/permisos/{id}/rols', {
    responses: {
      '200': {
        description: 'create a Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Permisos.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRolInPermisos',
            exclude: ['_id'],
          }),
        },
      },
    }) rol: Omit<Rol, '_id'>,
  ): Promise<Rol> {
    return this.permisosRepository.rols(id).create(rol);
  }

  @patch('/permisos/{id}/rols', {
    responses: {
      '200': {
        description: 'Permisos.Rol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Partial<Rol>,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.permisosRepository.rols(id).patch(rol, where);
  }

  @del('/permisos/{id}/rols', {
    responses: {
      '200': {
        description: 'Permisos.Rol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.permisosRepository.rols(id).delete(where);
  }
}
