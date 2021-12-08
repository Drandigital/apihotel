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
        Name: "Hamburguesa Doble",
        price:30000
    },
    {
        id : 005,
        Name: "Carne",
        price:30000
    },
    {
        id : 004,
        Name: "Postobon manzana",
        price:30000
    },
    {
        id : 006,
        Name: "Lomo",
        price:30000
    }

    

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

