var passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../../models/user');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromHeader("x-auth-token");
opts.secretOrKey = 'tasmanianDevil';

module.exports = function() {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload.id, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};