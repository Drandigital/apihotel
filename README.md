# Hotel API

Una API para gestionar hoteles, habitaciones y reservas.

Descripción
Este proyecto proporciona una API RESTful para gestionar hoteles. Las principales funcionalidades incluyen:

Creación, modificación y consulta de hoteles.
Gestión de habitaciones dentro de hoteles.
Reservas de habitaciones.
Instalación
Clona el repositorio desde el enlace proporcionado.
Instala las dependencias con el siguiente comando:

## Installation

 Descarga el repositorio en el siguiente link [repositorio](git clone [enlace-del-repositorio]
) e instala el package como se muestra a continuación.

```bash
npm install
```

## Uso

1. Ejecuta el proyecto con el siguiente comando :

```bash
nodemon src/index.js
```
2. Entra a la documentación de swagger en el siguiente link [documentacion](http://localhost:3000/api-docs/)



### Configura las variables de entorno

Copia el archivo .env.example a un nuevo archivo llamado .env y configura las variables según tu entorno.

## Endpoints

POST /hoteles/crear: Crea un nuevo hotel.
PUT /hoteles/modificar/:hotelId: Modifica un hotel existente.
PUT /hoteles/toggle-status/:hotelId: Cambia el estado de un hotel.
GET /hoteles/:hotelId: Obtiene información de un hotel en particular.

## Herramientas Utilizadas

Express: Framework para Node.js.
Mongoose: ORM para MongoDB.
Swagger UI: Para documentación y prueba de la API.

# Proyecto-Hotel
#   a p i h o t e l 
 
 
