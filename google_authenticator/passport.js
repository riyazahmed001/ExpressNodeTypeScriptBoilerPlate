import passport from 'passport';
import passport_oauth2 from 'passport-google-oauth2';
const GoogleStrategy = passport_oauth2.Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"your client id",
        clientSecret:"your client secret",
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));