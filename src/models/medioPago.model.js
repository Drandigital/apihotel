const mediosDePago = [
    { 
        id: 1,
        medio: "Tarjeta de Credito"
       
    },

    { 
        id: 2,
        medio: "Efectivo"
       
    }
    
];

const obtenerMedioPago = () => {
    return mediosDePago;

}

const agregarMedioPago = (agregarMedio) => {
    mediosDePago.push(agregarMedio);
}

const eliminarMedioPago = (eliminaMedio) => {
    mediosDePago.splice(eliminaMedio, 1);

}


module.exports = {obtenerMedioPago,agregarMedioPago,eliminarMedioPago}