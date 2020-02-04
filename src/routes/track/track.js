const express = require('express')
const router = express.Router()

const db = require('../../db/db')

router.get('/', (req, res) => {
    res.render('track', {
        data: null
    })
})

router.post('/', (req, res) => {

    db.getByCode(req.body["trackingCode"], (data) => {
        
        if (!data) return res.send('Tracking code has not been found in the database.')

        res.render('track', {
            data
        })
    })
    
})

module.exports = router