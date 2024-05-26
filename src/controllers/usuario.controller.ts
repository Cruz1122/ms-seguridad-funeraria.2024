import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {ConfiguracionSeguridad} from '../config/seguridad.config';
import {
  Credenciales,
  CredencialesRecuperarClave,
  FactorDeAutenticacionPorCodigo,
  HashValidacionUsuario,
  Login,
  PermisosRolxPermisos,
  Usuario,
} from '../models';
import {LoginRepository, UsuarioRepository} from '../repositories';
import {
  AuthService,
  NotificacionesService,
  SeguridadUsuarioService,
} from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(SeguridadUsuarioService)
    public servicioSeguridad: SeguridadUsuarioService,
    @repository(LoginRepository)
    public repositorioLogin: LoginRepository,
    @service(AuthService)
    private servicioAuth: AuthService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) {}

  @authenticate({
    strategy: 'auth',
    options: ['Usuario', 'guardar'],
  })
  @post('/usuario')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['_id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, '_id'>,
  ): Promise<Usuario> {
    let clave = this.servicioSeguridad.crearTextoAleatorio(10);
    let claveCifrada = this.servicioSeguridad.cifrarTexto(clave);
    usuario.clave = claveCifrada;
    usuario.estadoValidacion = true;

    return this.usuarioRepository.create(usuario);
  }

  @post('/usuario-publico')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async creacionPublica(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['_id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, '_id'>,
  ): Promise<Usuario> {
    let clave = this.servicioSeguridad.crearTextoAleatorio(10);
    let claveCifrada = this.servicioSeguridad.cifrarTexto(clave);
    usuario.clave = claveCifrada;
    //hash de validacion de correo
    let hash = this.servicioSeguridad.crearTextoAleatorio(100);
    usuario.hashValidacion = hash;
    usuario.estadoValidacion = false;
    usuario.aceptado = false;

    //Notificacion del hash
    let enlace =
      ConfiguracionNotificaciones.urlValidacionCorreoFrontend + '/' + hash;
    let datosEmail = {
      destination: usuario.correo,
      name: usuario.primerNombre,
      message: `Por favor visite este link para validar su correo: ${enlace}`,
      subject: ConfiguracionNotificaciones.asuntoVerificaciónCorreo,
    };
    let urlEmail = ConfiguracionNotificaciones.urlEmail2fa;
    this.servicioNotificaciones.EnviarNotificacion(datosEmail, urlEmail);

    // Envío de clave
    let datosCorreo = {
      destination: usuario.correo,
      name: usuario.primerNombre,
      message: `Su clave asignada es: ${clave}`,
      subject: ConfiguracionNotificaciones.claveAsignada,
    };

    this.servicioNotificaciones.EnviarNotificacion(datosCorreo, urlEmail);

    return this.usuarioRepository.create(usuario);
  }

  @post('/validar-hash-usuario')
  @response(200, {
    description: 'Validar hash',
  })
  async ValidarHashUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HashValidacionUsuario, {}),
        },
      },
    })
    hash: HashValidacionUsuario,
  ): Promise<boolean> {
    let usuario = await this.usuarioRepository.findOne({
      where: {
        hashValidacion: hash.codigoHash,
        estadoValidacion: false,
      },
    });

    if (usuario) {
      usuario.estadoValidacion = true;
      this.usuarioRepository.replaceById(usuario._id, usuario);
      return true;
    }
    return false;
  }

  @get('/usuario/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Usuario) where?: Where<Usuario>): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [
      ConfiguracionSeguridad.permisoUsuarioId,
      ConfiguracionSeguridad.listarAccion,
    ],
  })
  @get('/usuario')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuario')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuario/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'})
    filter?: FilterExcludingWhere<Usuario>,
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuario/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuario/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuario/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  /**
   * Métodos personalizados para la API
   */

  @post('/identificar-usuario')
  @response(200, {
    description: 'Identificar a un usuario por correo y clave',
    content: {'aplication/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async identificarUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales),
        },
      },
    })
    credenciales: Credenciales,
  ): Promise<Object> {
    let usuario = await this.servicioSeguridad.identificarUsuario(credenciales);
    if (usuario) {
      let codigo2fa = this.servicioSeguridad.crearTextoAleatorio(5);
      let login: Login = new Login();
      login.idUsuario = usuario._id!;
      login.codigo2FA = codigo2fa;
      login.estadoCodigo = false;
      login.token = '';
      login.estadoToken = false;
      this.repositorioLogin.create(login);
      usuario.clave = '';
      // Notificar al usuario vía correo o SMS
      let datosEmail = {
        destination: usuario.correo,
        name: usuario.primerNombre,
        message: `Su código de 2FA es: ${codigo2fa}`,
        subject: ConfiguracionNotificaciones.asunto2fa,
      };
      let datosSMS = {
        destination: '+57' + usuario.telefono,
        name: usuario.primerNombre,
        message: `Su código de 2FA es: ${codigo2fa}`,
      };
      let urlEmail = ConfiguracionNotificaciones.urlEmail2fa;
      let urlSMS = ConfiguracionNotificaciones.urlSMS2fa;
      this.servicioNotificaciones.EnviarNotificacion(datosEmail, urlEmail);
      this.servicioNotificaciones.EnviarNotificacion(datosSMS, urlSMS);
      return usuario;
    }
    return new HttpErrors[401]('Credenciales inválidas');
  }

  @post('/recuperar-clave')
  @response(200, {
    description: 'Identificar a un usuario por correo y clave',
    content: {'aplication/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async RecuperarClaveUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CredencialesRecuperarClave),
        },
      },
    })
    credenciales: CredencialesRecuperarClave,
  ): Promise<Object> {
    let usuario = await this.usuarioRepository.findOne({
      where: {
        correo: credenciales.correo,
      },
    });
    if (usuario) {
      let nuevaClave = this.servicioSeguridad.crearTextoAleatorio(5);
      console.log('Nueva clave ', nuevaClave);
      let claveCifrada = this.servicioSeguridad.cifrarTexto(nuevaClave);
      usuario.clave = claveCifrada;
      this.usuarioRepository.updateById(usuario._id, usuario);
      // Notificar al usuario vía correo o SMS
      let datosEmail = {
        destination: usuario.correo,
        name: usuario.primerNombre,
        message: `Hola ${usuario.primerNombre}, Su nueva clave es: ${nuevaClave}`,
        subject: ConfiguracionNotificaciones.asunto2fa,
      };
      let datosSMS = {
        destination: '+57' + usuario.telefono,
        name: usuario.primerNombre,
        message: `Hola ${usuario.primerNombre}, Su nueva clave es: ${nuevaClave}`,
      };
      let urlEmail = ConfiguracionNotificaciones.urlEmail2fa;
      let urlSMS = ConfiguracionNotificaciones.urlSMS2fa;
      console.log('Datos de notificación ', datosSMS);
      console.log('URL ', urlSMS);
      this.servicioNotificaciones.EnviarNotificacion(datosEmail, urlEmail);
      this.servicioNotificaciones.EnviarNotificacion(datosSMS, urlSMS);
      return usuario;
    }
    return new HttpErrors[401]('Credenciales inválidas');
  }

  @post('/validar-permisos')
  @response(200, {
    description: 'Validación de permisos de un usuario para lógica de negocio',
    content: {
      'aplication/json': {schema: getModelSchemaRef(PermisosRolxPermisos)},
    },
  })
  async ValidarPermisosDeUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisosRolxPermisos),
        },
      },
    })
    datos: PermisosRolxPermisos,
  ): Promise<UserProfile | undefined> {
    let idRol = this.servicioSeguridad.obtenerRolDesdeToken(datos.token);
    return this.servicioAuth.VerificarPermisoDeUsuarioPorRol(
      idRol,
      datos.idPermisos,
      datos.accion,
    );
  }

  @post('/verificar-2fa')
  @response(200, {
    description: 'Validar un código de 2fa',
  })
  async verificarCodigo2fa(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FactorDeAutenticacionPorCodigo),
        },
      },
    })
    credenciales: FactorDeAutenticacionPorCodigo,
  ): Promise<Object> {
    let usuario = await this.servicioSeguridad.validarCodigo2fa(credenciales);
    if (usuario) {
      let token = this.servicioSeguridad.crearToken(usuario);
      if (usuario) {
        usuario.clave = '';
        try {
          this.usuarioRepository.login(usuario._id).patch(
            {
              estadoCodigo: true,
              token: token,
            },
            {
              estadoCodigo: false,
            },
          );
        } catch {
          console.log(
            'No se ha almacenado el cambio de estado del token en la base de datos',
          );
        }

        return {
          user: usuario,
          token: token,
        };
      }
    }
    return new HttpErrors[401](
      'Código de 2FA inválido para el usuario definido',
    );
  }
}
