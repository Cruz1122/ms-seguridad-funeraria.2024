# Microservicio de Seguridad - Funeraria Digital

Este microservicio gestiona todos los aspectos de seguridad del sistema, incluyendo la autenticación de usuarios, la gestión de roles y permisos, y el registro de acciones.

## Tabla de Contenidos

1.  [Descripción General](#descripción-general)
2.  [Características](#características)
3.  [Estructura del Proyecto](#estructura-del-proyecto)
4.  [Modelos de Datos](#modelos-de-datos)
5.  [Endpoints de la API](#endpoints-de-la-api)
6.  [Variables de Entorno](#variables-de-entorno)
7.  [Instalación y Ejecución](#instalación-y-ejecución)
8.  [Comandos Útiles](#comandos-útiles)

## Descripción General

El microservicio de seguridad es un componente central del sistema funerario, construido con [LoopBack 4](https://loopback.io/). Proporciona una base sólida y segura para la autenticación y autorización de usuarios. Sus principales responsabilidades son:

* **Autenticación de Usuarios:** Verifica la identidad de los usuarios mediante credenciales (correo y contraseña) y un segundo factor de autenticación (2FA).
* **Gestión de Usuarios:** Permite la creación de usuarios tanto por administradores como de forma pública, con un proceso de validación de correo electrónico.
* **Gestión de Roles y Permisos:** Administra los roles de los usuarios y los permisos asociados a cada rol, controlando el acceso a las diferentes funcionalidades del sistema.
* **Seguridad:** Implementa estrategias de autenticación basadas en JSON Web Tokens (JWT) para proteger los endpoints de la API.

## Características

* **Autenticación JWT:** Utiliza JSON Web Tokens para asegurar las rutas de la aplicación.
* **Control de Acceso Basado en Roles (RBAC):** Define roles y permisos para controlar el acceso de los usuarios a los recursos.
* **Segundo Factor de Autenticación (2FA):** Proporciona una capa adicional de seguridad mediante un código enviado por correo electrónico o SMS.
* **Registro Público de Usuarios:** Permite que los usuarios se registren de forma pública, con un proceso de validación por correo electrónico para activar sus cuentas.
* **Recuperación de Contraseña:** Ofrece un mecanismo para que los usuarios recuperen su contraseña de forma segura.
* **Gestión de Modelos:** Proporciona endpoints para administrar los modelos `Usuario`, `Rol`, `Permisos`, `Login` y `RegistroAcciones`.

## Estructura del Proyecto

El proyecto sigue la estructura estándar de una aplicación LoopBack 4:

* `src/controllers:` Contiene los controladores que gestionan la lógica de la API REST.
* `src/models:` Define los modelos de datos de la aplicación.
* `src/repositories:` Contiene los repositorios que gestionan la persistencia de los datos en la base de datos.
* `src/datasources:` Configura la conexión a la base de datos, en este caso, MongoDB.
* `src/services:` Contiene los servicios que encapsulan la lógica de negocio, como la autenticación y las notificaciones.
* `src/auth:` Contiene la estrategia de autenticación personalizada.
* `public:` Contiene archivos estáticos, como la página de inicio de la aplicación.

## Modelos de Datos

El microservicio utiliza los siguientes modelos de datos:

* **Usuario:** Representa a los usuarios del sistema, con sus datos personales y de contacto.
* **Rol:** Define los roles que pueden ser asignados a los usuarios (ej. Administrador, Usuario Público).
* **Permisos:** Define las acciones que los usuarios pueden realizar en el sistema (ej. listar, guardar, editar).
* **Login:** Almacena la información de inicio de sesión de los usuarios, incluyendo los códigos 2FA y los tokens JWT.
* **RegistroAcciones:** Registra las acciones realizadas por los usuarios en el sistema.
* **RolxPermisos:** Es la tabla intermedia que asocia los roles con los permisos, definiendo qué acciones puede realizar cada rol.

## Endpoints de la API

El microservicio expone varios endpoints para la gestión de la seguridad, entre los que se incluyen:

### Autenticación y Usuarios

* `POST /identificar-usuario:` Identifica a un usuario por correo y clave y envía un código de 2FA.
* `POST /verificar-2fa:` Valida el código de 2FA y devuelve un token JWT.
* `POST /usuario-publico:` Permite el registro de un nuevo usuario de forma pública.
* `POST /recuperar-clave:` Inicia el proceso de recuperación de contraseña para un usuario.
* `POST /validar-hash-usuario:` Valida el hash de un usuario para la activación de la cuenta.

### Gestión de Modelos

El microservicio también proporciona endpoints CRUD para la gestión de los modelos `Usuario`, `Rol`, `Permisos`, `Login` y `RegistroAcciones`.

* **Usuarios:**
    * `POST /usuario`
    * `GET /usuario`
    * `GET /usuario/{id}`
    * `PATCH /usuario/{id}`
    * `DELETE /usuario/{id}`
* **Roles:**
    * `POST /rol`
    * `GET /rol`
    * `GET /rol/{id}`
    * `PATCH /rol/{id}`
    * `DELETE /rol/{id}`
* **Permisos:**
    * `POST /permiso`
    * `GET /permiso`
    * `GET /permiso/{id}`
    * `PATCH /permiso/{id}`
    * `DELETE /permiso/{id}`

## Variables de Entorno

Para su correcto funcionamiento, el microservicio requiere la configuración de las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

* `SECRET_PASSWORD_JWT:` Una clave secreta para la firma de los JSON Web Tokens.
* `CONNECTION_STRING_MONGODB:` La cadena de conexión a la base de datos de MongoDB.

## Instalación y Ejecución

Para instalar y ejecutar el microservicio, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/cruz1122/ms-seguridad-funeraria.2024.git](https://github.com/cruz1122/ms-seguridad-funeraria.2024.git)
    cd ms-seguridad-funeraria.2024
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
   

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade las variables de entorno necesarias.

4.  **Ejecutar el microservicio:**
    ```bash
    npm start
    ```
   

El microservicio estará disponible en `http://127.0.0.1:3001`.

## Comandos Útiles

El proyecto incluye varios scripts útiles definidos en el archivo `package.json`:

* **`npm run build`**: Compila el proyecto de TypeScript a JavaScript.
* **`npm run lint`**: Analiza el código en busca de errores y problemas de estilo.
* **`npm run lint:fix`**: Corrige automáticamente los problemas de estilo.
* **`npm test`**: Ejecuta las pruebas del proyecto.
* **`npm run openapi-spec`**: Genera la especificación OpenAPI en un archivo.
* **`npm run docker:build`**: Construye una imagen de Docker para la aplicación.
* **`npm run docker:run`**: Ejecuta la aplicación dentro de un contenedor de Docker.
