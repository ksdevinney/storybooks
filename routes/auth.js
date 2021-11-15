const express = require('express');
const router = express.Router();
const passport = require('passport');

// google auth
// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// google auth callback
// GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;