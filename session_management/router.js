import express from 'express';

export const router = express.Router();

router.get('/',(req,res) => {
    let sess = req.session;
    if(sess.email) {
        return res.redirect('/admin');
    }
    res.sendFile('index.html');
});

router.post('/login',(req,res) => {
    req.session.email = req.body.email;
    res.end('done');
});

router.get('/admin',(req,res) => {
    if(req.session.email) {
        res.write(`<h1>Hello ${req.session.email} h1><br>`);
        res.end('Logout');
    }
    else {
        res.write('Please login first.');
        res.write('logout');
        res.end('end');
    }
});

router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

