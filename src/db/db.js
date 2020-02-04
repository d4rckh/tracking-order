const sqlite3 = require('sqlite3').verbose();
const id = require('../util/id')

let db = new sqlite3.Database('./database.db');

module.exports.getAll = (cb) => {
    db.all("SELECT * FROM trackingcodes", [], (err, rows) => {
        cb(rows)
    })
}

module.exports.createTrackingCode = ({ name,  status,  email, notes, code}) => {
    if (!code) code = id()
    if (!status) status = "Tracking code has just been created."
    if (!name) name = "Anonymous"
    if (!email) email = ""
    if (!notes) notes = "No notes."
    db.run('INSERT INTO trackingcodes(name, status, email, notes, code) VALUES(?,?,?,?,?)', [
        name, status, email, notes, code
    ])
}

module.exports.getByCode = (code, cb) => {
    if (!code) cb(undefined)

    db.all("SELECT * FROM trackingcodes WHERE code=(?)", [code], (err, rows) => {
        if (rows[0]) {
            cb(rows[0])
        } else {
            cb(undefined)
        }
    })
}

module.exports.editName = (code, newName) => {
    db.run('UPDATE trackingcodes SET name=(?) WHERE code=(?)', [
        newName, code
    ])
}

module.exports.editStatus = (code, newStatus) => {
    db.run('UPDATE trackingcodes SET status=(?) WHERE code=(?)', [
        newStatus, code
    ])
}

module.exports.editEmail = (code, newEmail) => {
    db.run('UPDATE trackingcodes SET email=(?) WHERE code=(?)', [
        newEmail, code
    ])
}

module.exports.editNotes = (code, newNotes) => {
    db.run('UPDATE trackingcodes SET notes=(?) WHERE code=(?)', [
        newNotes, code
    ])
}

module.exports.deleteTrackingCode = (code) => {
    db.run('DELETE FROM trackingcodes WHERE code=(?)', [code])
}

//db.run("CREATE TABLE trackingcodes(name TEXT, status TEXT, email TEXT, notes TEXT, code TEXT)")

/*db.run('INSERT INTO trackingcodes(name, status, email, notes, code) VALUES(?,?,?,?,?)', [
    "John Doe", "Delivered", "", "", "9AJSD"
])*/