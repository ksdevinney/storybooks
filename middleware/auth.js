module.exports = {
    ensureAuth: function (req, res, next) {
        if(res.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next) {
        if (res.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}