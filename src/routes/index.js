const express = require('express')
const router = express.Router()

router.use('/admin', require('./admin/admin.js'))
router.use('/trackorder', require('./track/track.js'))

router.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    })
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.get('/login', (req, res) => {
    if (req.user) return res.redirect('/admin')
    res.render('login')
})

module.exports = router