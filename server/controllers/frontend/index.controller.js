const userHelper = require('../../helpers/user');

/**
 * Returns index page if user is not logged in or shows user info if he is
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function index(req, res, next) {
    console.log('REQ req session ' + JSON.stringify(req.sessionID));

    if (req.isAuthenticated()) {

        console.log('REQ req user id ' + JSON.stringify(req.user.id));

        var socialId = '';

        switch (req.user.loginType) {
            case "MI":
                socialId = req.user.social.azure
                break;
            case "FB":
                socialId = req.user.social.facebook
                break;
            case "GH":
                socialId = req.user.social.github
                break;
            case "GO":
                socialId = req.user.social.google
                break;
            case "LI":
                socialId = req.user.social.linkedin
                break;
            case "OI":
                socialId = req.user.social.openid
                break;
            case "TW":
                socialId = req.user.social.twitter
                break;
        }

        var userPromise = userHelper.getUserBySocialId(socialId, req.user.loginType);

        userPromise.then(function (data) {
            req.user.data = data;
            if (Object.keys(req.user.data).length > 0) {
                res.render('index', {
                    title: 'Universales',
                    message: 'Bienvenido',
                    url: 'localhost:3000',
                    user: req.user
                });
            } else {
                req.session.destroy();
                var err = new Error('El usuario no ha sido encontrado');
                err.status = 404;
                next(err);
            }
        });

        userPromise.catch(function (err) {
            console.log(err);
            req.session.destroy();
            err.status = 500;
            next(err);
        });

    } else {
        res.render('login', {
            title: 'Universales',
            message: 'Iniciar sesión',
            url: 'localhost:3000'
        });
    }
}

module.exports = { index };