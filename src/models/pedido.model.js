const pedidos = [
    {
        idUsuario: 3,
        idPedido: 0,
        estado: "Pendiente",
        direccion: "Cartagena",
        medioPago: "Tarjeta de Credito",
        pedido: [
            {
                nombre: "Lomo",
                cantidad: 2
            }
        ]
    },
    {
        idUsuario: 3,
        idPedido: 1,
        estado: "Confirmado",
        direccion: "Cartagena",
        medioPago: "Efectivo",
        pedido: [
            {
                nombre: "Hamburguesa Doble",
                cantidad: 1
            }
        ]
    },
    {
        idUsuario: 3,
        idPedido: 2,
        estado: "En Preparación",
        direccion: "Cartagena",
        medioPago: "Efectivo",
        pedido: [
            {
                nombre: "Hamburguesa Doble",
                cantidad: 1
            },
            { 
                nombre: "Postobon manzana",
                cantidad: 2
            }  
        ]
    },
    {
        idUsuario: 3,
        idPedido: 3,
        estado: "Enviado",
        direccion: "Cartagena",
        medioPago: "Tarjeta de Credito",
        pedido: [
            {
                nombre: "Carne",
                cantidad: 4
            }
        ]
    },
    {
        idUsuario: 1,
        idPedido: 4,
        estado: "Entregado",
        direccion: "Cartagena",
        medioPago: "Efectivo",
        pedido: [
            {
                nombre: "Hamburguesa Doble",
                cantidad: 1
            }
        ]
    }
];

const obtenerPedidos = () => {
    return pedidos;
}

const agregarPedido = (idpedidou, idpedido, products, dir, medio) => {
    pedido = 
        {
            idUsuario: idpedidou,
            idPedido: idpedido,
            estado: "Pendiente",
            direccion: dir,
            medioPago: medio,
            pedido: products
        };

    pedidos.push(pedido);
}

const agregarProducto = (indexPedido, producto) => {

    pedidos[indexPedido].pedido.forEach((product, i) => {
        if(product.nombre === producto.nombre){
            pedidos[indexPedido].pedido[i].cantidad += producto.cantidad;
        }
    });
    pedidos[indexPedido].pedido.push(producto);
}

const obtenerPedidosUsuario = (idPedidoUser) => {
    let resultado = []; 
    for (const pedido of pedidos) {
        if(pedido.idUsuario === idPedidoUser) resultado.push(pedido);
    }
    if(resultado.length > 0) return resultado;
    else  return "El usuario no tiene pedidos";
} 

const cambiarEstadoPedido = (status, index) => {
    pedidos[index].estado = status;
}

const obtenerProductosPedido = (indexPedido) => {
    return pedidos[indexPedido].pedido;
}

const eliminarProductoPedido = (indexPedido, indexProducto) => {
    pedidos[indexPedido].pedido.splice(indexProducto, 1);
}

const editarCantProducto = (indexPedido, indexProducto, cantidad) => {
    pedidos[indexPedido].pedido[indexProducto].cantidad = cantidad;
}
module.exports = { obtenerPedidos, agregarProducto, editarCantProducto, cambiarEstadoPedido, obtenerPedidosUsuario, agregarPedido, eliminarProductoPedido, obtenerProductosPedido};