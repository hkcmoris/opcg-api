import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'One Piece Card Game API',
        version: '2.0.0',
        description: 'API documentation for One Piece Card Game',
        contact: {
            name: "OPCG API Support",
            email: "moravec@devground.cz"
        },
    },
    servers: [{
        url: 'http://localhost:3000/api/v2',
        description: 'Local server'
    }]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;