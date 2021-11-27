const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');

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
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
    // console.log(req.user);
});

module.exports = router;