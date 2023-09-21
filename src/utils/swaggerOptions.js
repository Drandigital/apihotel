const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Hotel API",
            version: "1.0.0",
            description: "API para gestionar hoteles."
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerOptions;
