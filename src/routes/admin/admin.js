const express = require('express')
const nocache = require('nocache');

const router = express.Router()
const db = require('../../db/db')

router.use('/api', require('./api/api.js'))

router.get('/', require('connect-ensure-login').ensureLoggedIn(), nocache(), (req, res) => {
    if (!req.user.admin) res.redirect('/login')
    db.getAll((trackingCodes) => {
        res.render('admin', {
            user: req.user,
            trackingCodes
        })
    })
})

router.get('/:id', require('connect-ensure-login').ensureLoggedIn(), nocache(), (req, res) => {
    if (!req.user.admin) res.redirect('/login')
    const trackingCode = db.getByCode(req.params['id'], (row) => {
        if (!row) res.redirect('/admin')
        res.render('adminedit', {
            trackingCode: row
        })
    })
})
module.exports = router