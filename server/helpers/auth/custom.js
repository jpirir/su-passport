var passport = require("passport");
var CustomStrategy = require('passport-custom').Strategy;
var User = require('../../models/user');

module.exports = function() {
    var strategy = new CustomStrategy(function (req, done) {

        var find = {social: {}, loginType: req.body.socialType};

        switch (req.body.socialType) {
            case "MI":
                find.social.azure = req.body.socialId;
                break;
            case "FB":
                find.social.facebook = req.body.socialId;
                break;
            case "GH":
                find.social.github = req.body.socialId;
                break;
            case "GO":
                find.social.google = req.body.socialId;
                break;
            case "LI":
                find.social.linkedin = req.body.socialId;
                break;
            case "OI":
                find.social.openid = req.body.socialId;
                break;
            case "TW":
                find.social.twitter = req.body.socialId;
                break;
        }

        User.findOne(find, function (err, user) {
            if (err) {
                return done(err);
            } else {
                return done(null, user);
            }
        });
    });

    passport.use(strategy);
};