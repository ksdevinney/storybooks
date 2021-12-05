const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

// show/add
// GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
});

// process add form
// POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// show all public stories
// GET /stories/
// didn't work because some stories had no body :)))))
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()

        res.render('stories/index', {
            stories,
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// edit story
// get /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id,
        }).lean()

        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            res.render('/stories/edit', {
                story,
            })
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500')
    }
});

module.exports = router;