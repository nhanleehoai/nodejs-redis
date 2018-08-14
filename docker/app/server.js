const util = require('util');
const redis = require('redis');

const client = redis.createClient(process.env.REDIS_URL);

const getAsync = util.promisify(client.get).bind(client);
const setAsync = util.promisify(client.set).bind(client);
const keysAsync = util.promisify(client.keys).bind(client);

const express = require('express');
const app = express();


app.get('/', async (req, res) => {
      return res.send('Hello from NodeJS!');
});


app.get('/create/:key', async (req, res) => {
    const { key } = req.params;
    const value = req.query;
    await setAsync(key, JSON.stringify(value));
    return res.send('Success');
});
app.get('/:key', async (req, res) => {
    const { key } = req.params;
    const rawData = await getAsync(key);
    return res.json(JSON.parse(rawData));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});
