const request = require('supertest');
const app = require('./index'); 
describe('API de Hoteles', () => {
  // Prueba para la creación de un hotel
  it('Debería crear un nuevo hotel', async () => {
    const nuevoHotel = {
      nombre: 'Hotel de Prueba',
      ubicacion: 'Ciudad de Prueba',
      habitaciones: [
        {
          numero: 101,
          tipo: 'Individual',
          costoBase: 100,
          impuestos: 10,
        },
      ],
    };

    const response = await request(app)
      .post('/hoteles/crear')
      .send(nuevoHotel)
      .set('Authorization', 'Bearer tu_token_de_autenticacion'); // Ajusta el token de autenticación

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('hotel');
  });

 

  // Prueba para obtener un hotel por su ID
  it('Debería obtener un hotel por su ID', async () => {
    const idHotel = 'id_del_hotel'; // Reemplaza con un ID válido

    const response = await request(app)
      .get(`/hoteles/${idHotel}`)
      .set('Authorization', 'Bearer tu_token_de_autenticacion');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('hotel');
  });
});
