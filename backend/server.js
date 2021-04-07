const http = require('http');
const app = require('./app');
const io = require('socket.io');

// Renvois un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Créer un port d'écoute pour construire l'API
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Gère les différentes erreurs possibles
const server = http.Server(app);
const socket = io(server);

// Définit une écoute en temps réel
socket.on('error', errorHandler);
socket.on('CONNECT', (socket) => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
    socket.on('DISCONNECT', () => {
        console.log("Disconnected")
    });
});

// Renvois la réponse du server au port 3000
server.listen(port);