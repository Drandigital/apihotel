
require('dotenv').config();
const redis = require('redis');

const redisPORT = process.env.redisPORT;
const clienteRedis = redis.createClient(redisPORT);

module.exports = clienteRedis;