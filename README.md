# Sprint project (Api restaurante)

Proyecto en el cual podrás como administrador de un restaurante, agregar, modificar o quitar productos, ver los pedidos de tus clientes y modificar sus estados para organizarlos conforme se vayan preparando y como usuario podrás ver los productos disponibles, crear una cuenta, agregar o quitar productos de tu pedido, elegir medios de pago, especificar la dirección de entrega de tu pedido .

## Installation

 Descarga el repositorio en el siguiente link [repositorio](https://gitlab.com/drannath11/proyecto-sprint-1) e instala el package como se muestra a continuación.

```bash
npm install
```

## Uso

1. Ejecuta el proyecto con el siguiente comando :

```bash
nodemon src/index.js
```
2. Entra a la documentación de swagger en el siguiente link [documentacion](http://localhost:3000/api-docs/)

3. El usuario administrador es Nathan y su clave es 12345 con este usuario tienes acceso a todas las rutas de la API, y el usuario de prueba ese Natan y su clave 12345 por si no deseas crear un cuenta propia. (Es importante en el autorize loguearse con el usuario con el que se va a trabajar).
### Rutas habilitadas para el usuario
4. En la ruta POST//login/{registro} podras crear una nueva cuenta. poniendo en el body toda la informacion requerida como se muestra a continuacion:

```javascript
{
        "username": "Dran",
        "password": "sosmosdran",
        "email": "drandigital@gmail.com",
        "telefono": 3156770183,
        "direccion": "Cartagena",
        "isAdmin": true
}
```
 en la parte de responses body, debe aparecer cuenta creada.

5. Para verificar debes ir a la ruta POST/login loguearte con el username y el password del usuario creado. Poniendo en el body el username y password como se muestra a continuación:

```javascript
{
  "username": "Natan",
  "password": "12345"
}
```


nota : en este momento debes en el authorize ingresar el username y el password del usuario creado.

6. Si verificas en la ruta GET/pedidos/:username/:password, teniendo en el autorize el username y el password indicado te debe traer el pedido asociado al usuario que tienes alli, en este caso traera un pedido sin productos en el cual podras empezar a agregar los productos que desees incluir en tu pedido, este se veria asi:

```javascript
  http://localhost:3000/pedidos/Natan/12345

  {

    [
    {
        "idUsuario": "3",
        "idPedido": "0",
        "estado": "Pendiente",
        "direccion": "Cartagena",
        "medioPago": "Tarjeta de Credito",
        "pedido": [
            {
                "nombre": "Lomo",
                "cantidad": 2
            }
        ]
    },
    {
        "idUsuario": "3",
        "idPedido": "1",
        "estado": "Confirmado",
        "direccion": "Cartagena",
        "medioPago": "Efectivo",
        "pedido": [
            {
                "nombre": "Hamburguesa Doble",
                "cantidad": "1"
            }
        ]
    },
    {
        "idUsuario": "3",
        "idPedido": "2",
        "estado": "En Preparación",
        "direccion": "Cartagena",
        "medioPago": "Efectivo",
        "pedido": [
            {
                "nombre": "Hamburguesa Doble",
                "cantidad": "1"
            },
            {
                "nombre": "Postobon manzana",
                "cantidad": "2"
            }
        ]
    },
    {
        "idUsuario": "3",
        "idPedido": "3",
        "estado": "Enviado",
        "direccion": "Cartagena",
        "medioPago": "Tarjeta de Credito",
        "pedido": [
            {
                "nombre": "Carne",
                "cantidad": "4"
            }
        ]
    }
]
  }

```
7. En la ruta GET/producto puedes ver todos los productos disponibles para la venta y verificar el id de cada uno.

8. En la ruta POST/pedidos vas a poder agregar un producto a tu pedido por medio del id del producto. Debes poner el id del producto deseado en la casilla habilitada en el interior de la ruta, darle execute, al agregarlo te apareceria algo como esto:


```javascript
{
  
        "idUsuario": "3",
        "idPedido": "0",
        "estado": "Pendiente",
        "direccion": "Cartagena",
        "medioPago": "Tarjeta de Credito",
        "pedido": [
            {
                "nombre": "Lomo",
                "cantidad": "2"
            }
        ]
```

puedes agregar cuantos desees y podras ver la cantidad y el valor que deberas pagar por el pedido de los productos seleccionados y  en el atributo q podras ver la cantidad de productos que llevas de la misma referencia.

9. En la ruta DELETE/pedidos/borrarproducto puedes eliminar cualquier producto de los seleccionados anteriormente, ingreso su id en la casilla habilitada en el interior de la ruta, al eliminarlo el costo del pedido debe ser igual a la sumatoria del costo de los productos que queden en el pedido.

10. En la ruta GET/medios vas a poder observar los medios de pago disponibles con su corresponiente id.


11. En la ruta PUT/pedidos/cerrarPedido podras Cerrar el pedido para todos los que esten en un estado pendiente.

12. En la ruta PUT/pedidos/agregarProducto vas a poder agragar nuevos productos sin el pedido no esta cerrado.

13.  En la ruta PUT/pedidos/editarCantidad Va a poder Editar la cantidad de un producto de un usuario del sistema.


14. En la ruta PUT/usuarios se podra modificar el usuario creado. se debe ingresar en la casilla habilitada dentro de la ruta el id del usuario a editar (este lo puedes verificar en el numeral 5 en el response aparece el username y el id que le corresponde al usuario), y en el body poner los datos que se desean modificar. ( recuerda que debes estar logueado con username y password en el autorize para ejecutar esta accion).

### Rutas habilitadas para el Administrador (debes usar el usuario y contraseña en el autorize mencionado en el numeral 3).

15. En la ruta POST/medios puedes agregar un medio de pago enviandolo por el body de la siguiente manera.

```javascript
{
  
  "medio": "PSE"

}
```

y en responses van a aparecer todos los medios de pago incluyendo el recien ingresado con su id asignado segun el orden.

16. En la ruta DELETE/medios ingresando el id por la casilla habilitada eliminaras el medio de pago correspondiente a el id ingresado. (recuerda que debes loguearte con el username y password del administrador mencionado en el numeral 3).

17. En la ruta PUT/medios} puedes actualizar los medios de pago existentes, en la casilla habilitada debes poner el id del medio de pago que deseas editar, y por el body enviar el medio de pago que quieres ingresar de la siguiente manera :

```javascript
{
  
  "id": 2,
  "medio": "PSE"

}
```

18. En la ruta PUT/pedidos/admin se puede cambiar el estado de las ordenes creadas, se debe enviar el id en la casilla habilitada del pedido que se quiere modificar, y en el body enviar el estado que se desea poner. (lo estados habilitados para el administrador son:pendiente, confirmado, en preparacion, enviado, entregado), a continuacion un ejemplo de lo que deberia ir en el body:

```javascript
{
  "username": "Natan",
  "idPedido": 0,
  "estado": "Enviado"
}
```
y en el response aparecera la orden con el estado modificado.

19. En la ruta GET/pedidos/admin vas a poder Obtener todos los pedidos del sistema.

20. En la ruta POST/producto podras agregar un nuevo producto para la venta, debes ingresar por el body el nombre y el precio del producto de la siguiente manera:

```javascript
{
  
  "Name": "carne",
  "price": 10000

}
```
y en el responses debe aparecer el producto creado con su respectivo id y cantidad "q" de la siguiente manera:

22. En la ruta PUT/producto/{admin} podras modificar productos ya creados, ingresando en la casilla habilitada el id del producto que quieres editar y en el body su nuevo nombre y precio de la siguiente manera:

```javascript
{
  "id": 3,
  "Name": "Hamburguesa Doble",
  "price": 70000
}
```
en el responses te debe aparecer " product updated ", si vas a la ruta GET/producto y le das execute vas a ver todos los productos incluyendo el actualizado.

23. En la ruta DELETE//producto/{id} puedes eliminar los productos habilitados para la venta, debes ingresar el id del producto que quieres eliminar en la casilla habilitada y en el responses apareceran todos los productos excepto el que acabas de eliminar.

24. En la ruta DELETE/usuarios/{id} podras eliminar los usuarios existentes, debes ingresar el id en la casilla habilitada del usuario que quieres eliminar y en el responses deben aparecer todos los usuarios excepto el que acabas de eliminar.

25. En la ruta  GET/usuarios puedes obtener todos los usuarios con una cuenta habilitada en la aplicacion.
# Api_Restaruante
# Api_Restaruante
# Proyecto-API-2-Nathan
