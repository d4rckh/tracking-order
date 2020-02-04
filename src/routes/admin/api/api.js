const express = require('express')
const router = express.Router()
const db = require('../../../db/db')
const {isEmail} = require('validator')
const adminOnly = require('../../../middlewares/adminOnly')

router.post('/update/name', (req, res) => {
    if (!req.user.admin) return res.redirect('/login')
    db.editName(req.body["code"], req.body["newName"])
    res.redirect('/admin/' + req.body["code"])
})

router.post('/update/status', adminOnly, (req, res) => {
    if (!req.body["newStatus"]) return res.redirect('/admin/' + req.body["code"])
    db.editStatus(req.body["code"], req.body["newStatus"])
    res.redirect('/admin/' + req.body["code"])
})

router.post('/update/email', adminOnly, (req, res) => {
    if (!req.body["newEmail"]) return res.redirect('/admin/' + req.body["code"])
    if (isEmail(req.body["newEmail"])) {
        db.editEmail(req.body["code"], req.body["newEmail"])
        res.redirect('/admin/' + req.body["code"])
    } else {
        return res.send("Email is not valid.")
    }
})

router.post('/update/notes', adminOnly, (req, res) => {
    if (!req.body["newNotes"]) return res.redirect('/admin/' + req.body["code"])
    db.editNotes(req.body["code"], req.body["newNotes"])
    res.redirect('/admin/' + req.body["code"])
})

router.post('/create', adminOnly, (req, res) => {
    if (req.body["email"]) {
        if (!isEmail(req.body["email"])) return res.redirect('/admin')
    }
    db.createTrackingCode({
        name: req.body["name"],
        status: req.body["status"],
        email: req.body["email"]
    })
    res.redirect('/admin')
})

router.post('/delete', adminOnly, (req, res) => {
    if (!req.body["code"]) return res.redirect('/admin')
    db.deleteTrackingCode(req.body["code"])
    res.redirect('/admin')
})

module.exports = router