const productos = [
    {
        id : 001,
        Name: "Cocacola",
        price:1000
    },
    {
        id : 002,
        Name: "Pizza",
        price:20000
    },
    {
        id : 003,
        Name: "Burguer",
        price:30000
    },

];

const obtenerProducto = () => {
    return productos;
};

const agregarProducto = (producto) => {
   productos.push(producto);
};
const eliminarProducto = (eliminarProduct) => {
    productos.splice(eliminarProduct, 1, 'Vacio');

}

const editarProducto = () => {

    
}


module.exports = { obtenerProducto , agregarProducto, eliminarProducto};

