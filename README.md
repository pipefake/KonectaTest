# KonectaTest
Este repositorio contiene el desarrollo creado para la aplicación para el puesto de analista de desarrollo.

Tabla de contenido

1.DEscripcion
2.Requisitos
3.Instalacion
4.Ejecucion de la aplicación
5.Mejores prácticas
6.Seguridad

Descripción:
Este proyecto es una aplicación para la aplicación en el puesto de analista desarrollador para la empresa Konecta en el se gestionan empleados, solicitudes y usuarios. La aplicación permite registrar usuarios e iniciar sesion, como también crear, listar y eliminar empleados y mantener la autenticidad de los usuarios a través JWT.

Requisitos Backend:
Node.js
Base de datos SQL (postgreSQL/MySQL)
Express.js 
bcryptjs
jsonwebtoken (JWT)
jest
dotenv
validator
supertest
cors
nodemon

Requisitos de Frontend:
Node.js
React
React-DOM
React-Router-Dom
React-Script
Axios
React-icons
React-Paginate
React testing Library
Jest 
Babel
ESLint

Instalación backend:

1. clonar el repositorio
2.  intalar dependencias (npm i / npm install)
3. Ejecutar el script SQL para crear las tablas y secuencias
4. correr el aplicacito ( node app.js)

Instalación Frontend:

1. clonar el repositorio
2. intalar dependencias (npm i / npm install)
3. correr el aplicativo ( npm start)

Dockerizacion:
1. clonar el repositorio (git clone (copia el link de mi repositorio))
2. construye las imagenes ==> docker-compose build
3. inicia los contenedores  ==> docker-compose up
4. accese por un navegador al frontend 
http://localhost:3000
y al backend
http://localhost:3001
Mejores prácticas:
5. verifica las sentencias SQL ubicadas en /BACKEND/scripts


Este proyecto se crea con el versionamiento de git, realizando commits de los respectivos avances.

Documentación: Se realiza un archivo README para la comprensión de los interesados en el proyecto.

Pruebas: Se realizan pruebas unitarias y de integración para asegurar la estabilidad del código utilizando JEST

Manejo de Errores: implementación del manejo de errores enviando mensajes y capturando exceptiones. utilización de try {}catch{} y validacion de entradas con validator

Despliegue: Se configura el dockerizacion de la aplicacion con los dockerfiles y el archivo docker-compose.yml


Seguridad:
autentificacion y autorizacion: utilizando JWT y almacenando el token y rol con ssesionstorage de manera segura.
hashing, se utiliza bcryptjs para el hasheo de las contraseñas antes de ser almacenadas en la base de datos

SQL injection:  utilización de consultas parametrizadas para evitar ataques de inyeccion Sql

cors: configuré el cors para que en el backend restringir el acceso a la api desde origenes no autorizados.

validacion de entrada de datos: se valida los datos de entrada tanto en el front end ocmo el en backend para evitar datos malisiosos.