var config = require("../../config/config");

/**
 * Loads login page
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function load(req, res, next) {
    res.render('login', {
        title: 'Universales',
        message: 'Iniciar sesión',
        url: config.host
    });
}

/**
 * Destroy user session and redirects to index
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function destroy(req, res, next) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}

module.exports = { load, destroy };