const router = require('express').Router();
const db = require('../database');

router.get('/', async (req, res) => {
    var sql = `
        SELECT 
        places.id, 
        places.name, 
        (SELECT COUNT(*) FROM plates p WHERE p.place_id = places.id) AS plates
        FROM places;`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).send({
                'error': err.message
            });
        }
        res.send(rows);
    });
});

router.get('/:id', async (req, res) => {
    const placeSql = 'SELECT * FROM places where id = ?'
    const platesSql = 'SELECT id, name, price, description FROM plates where place_id = ?'
    const params = [req.params.id];

    db.get(placeSql, params, (err, row) => {
        if (err) {
            res.status(400).send({
                'error': err.message
            });
        }
        var place = row;
        db.all(platesSql, params, (err, row) => {
            if (err) {
                res.status(400).send({
                    'error': err.message
                });
            }
            place.plates = row;
            res.send(place);
        });
    });
});

module.exports = router;