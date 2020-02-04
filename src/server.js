const express = require('express');
const passport = require('passport');

const { Strategy } = require('passport-local')

var { users } = require('./users')

passport.use(new Strategy((username, password, cb) => {
    users.findByUsername(username, (err, user) => {
        if (err) return cb(err);
        if (!user) return cb(null, false);
        if (user.password != password) return cb(null, false);
        return cb(null, user);
    });
}));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
  
passport.deserializeUser((id, cb) => {
    users.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index.js'))

app.post('/login', passport.authenticate('local', {
    failureRedirect: "/login"
}), (req, res) => {
    res.redirect('/admin')
})

app.listen(3030, () => {
    console.log('Listening on port 3030')
})