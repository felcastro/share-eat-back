var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../places.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Connected to database');
    }
})

module.exports = db;