const { createClient } = require('redis');

const redis = createClient({
  socket: {
    host: 'redis-lbl-129206817.us-east-1.elb.amazonaws.com',  // O el host del contenedor Docker
    port: 6379          // Puerto por defecto de Redis
  }
});

redis.on('error', (err) => {
  console.error('Error en Redis:', err);
});

redis.connect();

module.exports = redis;
