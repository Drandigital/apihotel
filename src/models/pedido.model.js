
const  pedidos = [
          
    {
          idUser: 3,
          idPedido: 1,
          estado: "Pendiente",
          direccionPedido: "Cartagena",
          cel: "3156770183",
          medioDePago: "Efectivo",
          pedidos: [] 

    },

    {
        idUser: 2,
        idPedido: 2,
        username: "Natan",
        estado: "Pendiente",
        direccionPedido: "Cartagena",
        cel: "3156770183",
        medioDePago: "Efectivo",
        pedidos: [

            {
                Name: "Cocacola",
                pedidos: 2
            },
            { 
                Name: "Burguer",
                pedidos: 2
            }



        ] 

  }

];

const estados =[
    
    {
        id: 1,
        estado: "Pendiente"
    },
    {
        id: 2,
        estado: "Confirmado"
    },
    {
        id: 3,
        estado: "En preparación"
    },
    {
        id: 4,
        estado: "Enviado"
    },
    {
        id: 5,
        estado: "Entregado"
    }





];


const obtenerPedidos = () => {
    return pedidos;
}

const agregarPedido = (pedidoNuevo) => {
    pedidos.push(pedidoNuevo);
}



const obtenerPedidosUsuario = (idPedidoUser) => {
    let resultado = []; 
    for (const pedido of pedidos) {
        if(pedido.idPedidosUsuario === idPedidoUser) resultado.push(pedido);
    }
    if(resultado.length > 0) return resultado;
    else  return "El usuario no tiene pedidos";
} 

const pruductoNuevoPedido = (idPedido, producto) => {

    pedidos[idPedido].pedidos.forEach((product, i) => {
        if(product.Name === producto.Name){
            pedidos[idPedido].pedidos[i].pedidos += producto.pedidos;
        }
    });
    pedidos[idPedido].pedidos.push(producto);
}


const cambiarEstado = (estado, id) => {};


module.exports = {obtenerPedidos, obtenerPedidosUsuario,agregarPedido, pruductoNuevoPedido};