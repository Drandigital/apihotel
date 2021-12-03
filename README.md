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
node src/index.js
```
2. Entra a la documentación de swagger en el siguiente link [documentacion](http://localhost:3000/api-docs/)

3. El usuario administrador es tiago y su clave es 1234 con este usuario tienes acceso a todas las rutas de la API, y el usuario de prueba ese Eve y su clave 5678 por si no deseas crear un cuenta propia. (Es importante en el autorize loguearse con el usuario con el que se va a trabajar).
### Rutas habilitadas para el usuario
4. En la ruta POST/cuenta/crearCuenta podras crear una nueva cuenta. poniendo en el body toda la informacion requerida como se muestra a continuacion:

```javascript
{
  "usuario": "Emiliano",
  "email": "emi@gmail.com",
  "username": "emi",
  "password": "1012",
  "telefono": 3217780943,
  "direccion": "avenida candeleo. calle 21 casa 33"
}
```
 en la parte de responses body, debe aparecer cuenta creada.

5. Para verificar debes ir a la ruta POST/cuenta/login loguearte con el username y el password del usuario creado. Poniendo en el body el username y password como se muestra a continuación:

```javascript
{
  "username": "emi",
  "password": "1012"
}
```

y en la parte de responses body debe aparecer "bienvenido emi tu id es el numero :3"

nota : en este momento debes en el authorize ingresar el username y el password del usuario creado.

6. Si verificas en la ruta GET/pedidos/verPedido, teniendo en el autorize el username y el password indicado te debe traer el pedido asociado al usuario que tienes alli, en este caso traera un pedido sin productos en el cual podras empezar a agregar los productos que desees incluir en tu pedido, este se veria asi:

```javascript
{
  "id": 3,
  "orderCost": 0,
  "username": "emi",
  "direccion": "avenida candeleo. calle 21 casa 33",
  "products": [],
  "medioDePago": "efectivo",
  "state": "pendiente"
}
```
7. En la ruta GET/productos puedes ver todos los productos disponibles para la venta y verificar el id de cada uno.

8. En la ruta POST/pedidos/producto/{id} vas a poder agregar un producto a tu pedido por medio del id del producto. Debes poner el id del producto deseado en la casilla habilitada en el interior de la ruta, darle execute, al agregarlo te apareceria algo como esto:


```javascript
{
  "id": 3,
  "orderCost": 10,
  "username": "emi",
  "direccion": "av. 43 calle 12 casa 3",
  "products": [
    {
      "id": 1,
      "productName": "TraditionalBurguer",
      "price": 10,
      "q": 1
    }
  ],
  "state": "pendiente"
}
```

puedes agregar cuantos desees y podras ver en orderCost el valor que deberas pagar por el pedido de los productos seleccionados y  en el atributo q podras ver la cantidad de productos que llevas de la misma referencia.

9. En la ruta DELETE/pedidos/producto/{id} puedes eliminar cualquier producto de los seleccionados anteriormente, ingreso su id en la casilla habilitada en el interior de la ruta, al eliminarlo el costo del pedido debe ser igual a la sumatoria del costo de los productos que queden en el pedido.

10. En la ruta GET/mediosDePago vas a poder observar los medios de pago disponibles con su corresponiente id.

11. En la ruta PUT/pedidos/medioDePago vas a poder especificar el medio de pago que quieres usar para pagar el pedido que estas solicitando. Por defecto te aparece efectivo.
Por la casilla habilitada para ingresar el id que corresponde al medio de pago que quieres utilizar.

12. En la ruta PUT/pedidos/cambioDireccion podras modificar la direccion que tiene actualmente, el por defecto pone la direccion que ingresas cuando creas tu cuenta, por el body vas a ingresar la nueva direccion de la siguente manera:

```javascript
{
  "direccion": "direccion actualizada"
}
```

y en el responses debe aparecer tu pedido con la direccion modificada.

13. En la ruta PUT/pedidos/confirmarPedido/{id} vas a cambiar el estado del pedido que estas modificando de pendiente a confirmado, para cerrar la orden y que pueda empezar el alistamiento del mismo, por el body debes ingresar el estado de la siguiente manera:

```javascript
{
  "state": "confirmado"
}
```

y por medio de la casilla habilitada dentro de la ruta poner el id del pedido al cual se le quiere modificar el estado (este id lo puedes ver en las rutas mencionadas en los numerales 12, 11, 9 y 8 en los cuales modificadas el pedido, en el responses aparece el pedido completo con su respectivo id).

14. En la ruta GET/pedidos/verHistorialPedidos vas a poder ver el pedido que acabas de confirmar y un nuevo pedido vacio con el estado pendiente, en el cual se podra iniciar nuevo pedido en caso de querer hacerlo.

15. En la ruta PUT/users/{id} se podra modificar el usuario creado. se debe ingresar en la casilla habilitada dentro de la ruta el id del usuario a editar (este lo puedes verificar en el numeral 5 en el response aparece el username y el id que le corresponde al usuario), y en el body poner los datos que se desean modificar. ( recuerda que debes estar logueado con username y password en el autorize para ejecutar esta accion).

### Rutas habilitadas para el Administrador (debes usar el usuario y contraseña en el autorize mencionado en el numeral 3).

17. En la ruta POST/mediosDePago puedes agregar un medio de pago enviandolo por el body de la siguiente manera.

```javascript
{
  "medioDePago": "nuevo medio de pago"
}
```

y en responses van a aparecer todos los medios de pago incluyendo el recien ingresado.

18. En la ruta DELETE/mediosDePago ingresando el id por la casilla habilitada eliminaras el medio de pago correspondiente a el id ingresado. (recuerda que debes loguearte con el username y password del administrador mencionado en el numeral 3).

19. En la ruta PUT/nuevoMediosDePago/{id} puedes actualizar los medios de pago existentes, en la casilla habilitada debes poner el id del medio de pago que deseas editar, y por el body enviar el medio de pago que quieres ingresar de la siguiente manera :

```javascript
{
  "medioDePago": "nuevo medio de pago"
}
```

20. En la ruta PUT/pedidos/cambiarEstadoPedido/{id} se puede cambiar el estado de las ordenes creadas, se debe enviar el id en la casilla habilitada del pedido que se quiere modificar, y en el body enviar el estado que se desea poner. (lo estados habilitados para el administrador son:pendiente, confirmado, en preparacion, enviado, entregado), a continuacion un ejemplo de lo que deberia ir en el body:

```javascript
{
  "state": "en preparacion"
}
```
y en el response aparecera la orden con el estado modificado.

21. En la ruta GET/pedidos se obtienen todas los pedidos en la aplicacion.

22. En la ruta POST/productos podras agregar un nuevo producto para la venta, debes ingresar por el body el nombre y el precio del producto de la siguiente manera:

```javascript
{
  "productName": "pinapple dessert",
  "price": 4
}
```
y en el responses debe aparecer el producto creado con su respectivo id y cantidad "q" de la siguiente manera:

```javascript
{
  "id": 8,
  "productName": "pinapple dessert",
  "price": 4,
  "q": 1
}
```
22. En la ruta PUT/productos/{id} podras modificar productos ya creados, ingresando en la casilla habilitada el id del producto que quieres editar y en el body su nuevo nombre y precio de la siguiente manera:

```javascript
{
  "productName": "crostty burguer",
  "price": 12
}
```
en el responses te debe aparecer " product updated ", si vas a la ruta GET/productos y le das execute vas a ver todos los productos incluyendo el actualizado.

23. En la ruta DELETE/productos/{id} puedes eliminar los productos habilitados para la venta, debes ingresar el id del producto que quieres eliminar en la casilla habilitada y en el responses apareceran todos los productos excepto el que acabas de eliminar.

24. En la ruta DELETE/users/{id} podras eliminar los usuarios existentes, debes ingresar el id en la casilla habilitada del usuario que quieres eliminar y en el responses deben aparecer todos los usuarios excepto el que acabas de eliminar.

25. En la ruta  GET/users puedes obtener todos los usuarios con una cuenta habilitada en la aplicacion.
