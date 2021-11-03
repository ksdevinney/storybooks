const express = require('express');
const router = express.Router();

// login page
// GET /
router.get('/', (req, res) => {
    res.render('Login')
});

// dashboard page
// GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('Dashboard')
});

module.exports = router;