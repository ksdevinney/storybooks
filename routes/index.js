const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// login page
// GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        // use hbs template
        layout: 'login',
    })
});

// dashboard page
// GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    // console.log(req.user);
    res.render('dashboard')
});

module.exports = router;