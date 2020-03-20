const router = require('express').Router();
const db = require('../database');
const plateValidator = require('../validators/plates_validator');
// const Plate = require('../models/plate');

router.get('/', async (req, res) => {
    const sql = 'SELECT * FROM plates';
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).send({'error': err.message});
        }
        res.send(rows);
    });
});

router.get('/:id', async (req, res) => {
    const sql = 'SELECT * FROM plates WHERE id = ?';
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).send({'error': err.message});
        }
        res.send(row);
    });
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const {error} = plateValidator(req.body);
    if (error) return res.status(400).send({error: error.details[0]});

    const plate = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        place_id: req.body.place_id
    };

    const sql = 'INSERT INTO plates (name, price, description, place_id) VALUES (?,?,?,?)';
    const params = [plate.name, plate.price, plate.description, plate.place_id];
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).send({'error': err.message});
        }
        res.send(plate);
    });
});

module.exports = router;