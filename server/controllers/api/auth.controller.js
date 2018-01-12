const passport  = require('passport');
const jwt  = require('jsonwebtoken');
const httpStatus  = require('http-status');
const APIError  = require('../../helpers/APIError');
const config  = require('../../config/config');

require('../../helpers/auth/custom')(passport);

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    passport.authenticate('custom', function (err, user, info) {
        if(err) {
            const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
            return next(err);
        }
        if(!user) {
            const err = new APIError('User not found', httpStatus.NOT_FOUND, true);
            return next(err);
        }
        console.log(user);
        const token = jwt.sign({id: user._id, sessionID: req.sessionID, timestamp: new Date().getTime()}, config.auth.secret);
        return res.status(200).json({type: "SUCCESS", msg: 'OK', resultSet: {token: token}});
    })(req, res, next);
}

module.exports = { login };