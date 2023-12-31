# Hotel API

Una API para gestionar hoteles, habitaciones y reservas.

## Descripción

Este proyecto proporciona una API RESTful para gestionar hoteles. Las principales funcionalidades incluyen:
- Creación, modificación y consulta de hoteles.
- Gestión de habitaciones dentro de hoteles.
- Reservas de habitaciones.



1. Clonar el repositorio
   ```bash
   git clone [https://github.com/Drandigital/apihotel.git]
   ```

2. Cambiar el nombre de la rama principal a main (si ya lo has hecho, omite este paso):
  git branch -M main

3. git push -u origin main
git push -u origin main

## Instalación 
4. Una vez clonado el repositorio, navega al directorio del proyecto e instala las dependencias necesarias: 
```bash
npm install
```
## USO
Ejecuta el proyecto:
Lanza el servidor con el siguiente comando:

```bash
nodemon src/index.js
```
5.Documentacion

6. Entra a la documentación de swagger en el siguiente link: [documentacion](http://localhost:3000/api-docs/)

7. Endpoints

POST /hoteles/crear: Crea un nuevo hotel.
PUT /hoteles/modificar/:hotelId: Modifica un hotel existente.
PUT /hoteles/toggle-status/:hotelId: Cambia el estado de un hotel.
GET /hoteles/:hotelId: Obtiene información de un hotel en particular.
Herramientas utilizadas
Express: Framework para Node.js.
Mongoose: ORM para trabajar con MongoDB.
Swagger UI: Herramienta para documentación y prueba de la API.
 
