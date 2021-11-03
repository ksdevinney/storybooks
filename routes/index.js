const express = require('express');
const router = express.Router();

// login page
// GET /
router.get('/', (req, res) => {
    res.send('Login')
});

// dashboard page
// GET /dashboard
router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
});

module.exports = router;