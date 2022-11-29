import express from 'express';
import passport from 'passport';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) ;

export const router = express.Router();

router.get('/login', 
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
));

router.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success');
    }
);

