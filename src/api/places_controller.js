const router = require('express').Router();
const db = require('../database');

router.get('/', async (req, res) => {
    var sql = 'SELECT * FROM places';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).send({'error': err.message});
        }
        res.send(rows);
    });
});

module.exports = router;