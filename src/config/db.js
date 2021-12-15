const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/retoApi', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing database');
    }
}

module.exports = {
    dbConnection
}