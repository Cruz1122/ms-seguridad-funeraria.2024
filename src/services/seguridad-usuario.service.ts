import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ConfiguracionSeguridad} from '../config/seguridad.config';
import {Credenciales, FactorDeAutenticacionPorCodigo, Usuario} from '../models';
import {LoginRepository, UsuarioRepository} from '../repositories';
const generator = require('generate-password');
const MD5 = require('crypto-js/md5');
var jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadUsuarioService {
  constructor(
    @repository(UsuarioRepository)
    public repositorioUsuario: UsuarioRepository,
    @repository(LoginRepository)
    public repositorioLogin: LoginRepository,
  ) {}

  /**
   * Crear una clave aleatoria
   * @returns cadena aleatoria de n caracteres
   */
  crearTextoAleatorio(n: number): string {
    let clave = generator.generate({
      length: n,
      numbers: true,
    });
    return clave;
  }

  /**
   * Cifrar cadena con MD5
   * @param cadena texto a cifrar
   * @returns cadena cifrada con MD5
   */
  cifrarTexto(cadena: string): string {
    let canedaCifrada = MD5(cadena).toString();
    return canedaCifrada;
  }

  /**
   * Se busca un usuario por sus credenciales de acceso
   * @param credenciales credenciales del acceso
   * @returns usuario encontrado o null
   */
  async identificarUsuario(
    credenciales: Credenciales,
  ): Promise<Usuario | null> {
    let usuario = await this.repositorioUsuario.findOne({
      where: {
        correo: credenciales.correo,
        clave: credenciales.clave,
      },
    });
    return usuario as Usuario;
  }

  /**
   * Valida un código de 2FA para un usuario
   * @param credenciales2fa credenciales del usuario con el codigo 2FA
   * @returns el registro del login o null
   */
  async validarCodigo2fa(
    credenciales2fa: FactorDeAutenticacionPorCodigo,
  ): Promise<Usuario | null> {
    let login = await this.repositorioLogin.findOne({
      where: {
        idUsuario: credenciales2fa.idUsuario,
        codigo2FA: credenciales2fa.codigo2fa,
        estadoCodigo: false,
      },
    });

    if (login) {
      let usuario = await this.repositorioUsuario.findById(
        credenciales2fa.idUsuario,
      );
      return usuario;
    }
    return null;
  }

  /**
   * Generación de JWT
   * @param usuario información del usuario
   * @returns token
   */
  crearToken(usuario: Usuario): string {
    let datos = {
      name: `${usuario.primerNombre} ${usuario.segundoNombre} ${usuario.primerApellido} ${usuario.segundoApellido}`,
      role: usuario.idRol,
      email: usuario.correo,
    };
    let token = jwt.sign(datos, ConfiguracionSeguridad.claveJWT);
    return token;
  }

  /**
   * Valida y obtiene el rol de un token
   * @param tk token
   * @returns el _id del rol
   */
  obtenerRolDesdeToken(tk: string): string {
    let obj = jwt.verify(tk, ConfiguracionSeguridad.claveJWT);
    return obj.role;
  }
}
