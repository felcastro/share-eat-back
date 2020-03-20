const express = require('express');
const app = express();
const cors = require('cors');

const placesRoute = require('./api/places_controller');
const platesRoute = require('./api/plates_controller');

app.use(cors());

app.listen(3001, () => console.log('Running on port 3001'));

app.get('/', (req, res, next) => {
    res.json({'status': 'Ok'});
});

app.use('/api/places', placesRoute);
app.use('/api/plates', platesRoute);

app.use((req, res) => {
    res.status(404);
})