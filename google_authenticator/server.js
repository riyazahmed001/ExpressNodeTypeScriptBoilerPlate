import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './passport.js';
import { router } from './google_authenticator_middleware.js';
const app = express();

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    if(req.user) {
        res.redirect('/success');
    }
    else {
        res.redirect('/login');
    }
})

app.get("/failed", (req, res) => {
    res.send("Failed");
})
app.get("/success",isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}`);
})

app.get('/login', (req, res) => {
    res.redirect('/google/login');
});

app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.send('logout successful');
});

app.use('/google', router);

app.listen(port, () => console.log("server running on port " + port));