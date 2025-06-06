Backend del Proyecto
Este proyecto cuenta con un backend desarrollado en Express que ofrece una API RESTful para gestionar la información de los jugadores de fútbol. El backend se conecta a una base de datos MongoDB (utilizando MongoDB Atlas para despliegues en la nube o una instancia local) y está configurado para trabajar con Firebase como sistema de autenticación, utilizando el Firebase Admin SDK para la gestión de usuarios y la protección de rutas.

⚙️ Estructura del Backend
El backend está compuesto por varias rutas que permiten interactuar con la base de datos y realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre los jugadores. Además, se incluyen funcionalidades de autenticación para gestionar el acceso de los administradores mediante Firebase.

1. Configuración Inicial
El archivo principal del servidor es index.js. En este archivo se configuran todos los middlewares y se define el comportamiento de las rutas. Utilizamos Express para crear las rutas de la API y Mongoose para interactuar con la base de datos MongoDB.

Dependencias importantes:
express: Framework web para crear la API RESTful.

firebase-admin: SDK de Firebase para acceder a la base de datos de Firebase y gestionar la autenticación de los usuarios.

mongoose: Librería de MongoDB para facilitar la interacción con la base de datos, como la creación de esquemas y modelos.

dotenv: Para manejar variables de entorno de forma segura, como las credenciales de Firebase y la URI de la base de datos.

2. Base de Datos (MongoDB)
Se utiliza MongoDB Atlas para almacenar los datos de los jugadores. Los datos se organizan en una colección llamada players.

Cada jugador tiene la siguiente estructura:
{
  "_id": "unique_id",
  "name": "nombre_del_jugador",
  "team": "nombre_del_equipo",
  "position": "posición",
  "age": "edad",
  "country": "país",
  "height": "altura",
  "weight": "peso",
  "playerImg": "url_de_imagen_del_jugador",
  "teamImg": "url_de_imagen_del_equipo",
  "countryImg": "url_de_imagen_del_país",
  "heightImg": "url_de_imagen_de_altura",
  "weightImg": "url_de_imagen_de_peso",
  "descripcion": "descripcion_del_jugador"

}

3. Rutas del Backend
El backend ofrece varias rutas para interactuar con los jugadores:

GET /: Obtiene todos los jugadores de la base de datos.

GET /id/:_id: Obtiene los detalles de un jugador específico por su ID.
GET /player/:name: Obtiene los detalles de un jugador específico por su ID.

POST /create: Crea un nuevo jugador (solo accesible por administradores).

PUT /id/:_id: Actualiza los detalles de un jugador existente (solo accesible por administradores).

DELETE /id/:_id: Elimina un jugador de la base de datos (solo accesible por administradores).

Las rutas están protegidas por un middleware que verifica si el usuario está autenticado. Las rutas de POST, PUT y DELETE solo pueden ser accedidas por administradores autenticados.

4. Autenticación y Protección de Rutas
Para manejar la autenticación y autorización de los administradores, se utiliza el Firebase Admin SDK. Cuando un usuario se registra o inicia sesión desde el frontend (React), el frontend envía el ID token generado por Firebase a las rutas del backend. El backend utiliza este ID token para verificar la autenticidad del usuario y asegurar que solo los administradores puedan acceder a las rutas protegidas.

Flujo de Autenticación:
El frontend solicita la autenticación del usuario con Firebase Auth (login y registro).

El frontend envía el ID token de Firebase a las rutas del backend para verificar la identidad del usuario.

El backend, utilizando el Firebase Admin SDK, valida el token y, si es válido, permite el acceso a las rutas protegidas.

Si el token no es válido o si el usuario no tiene permisos de administrador, el backend responde con un error de autenticación o autorización.

5. Middleware de Autenticación (checkAuth)
El middleware checkAuth se encarga de verificar que el usuario esté autenticado antes de permitir el acceso a rutas protegidas. Este middleware verifica el ID token enviado por el frontend y, si es válido, permite el acceso a la ruta solicitada.
