import express from 'express';

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) ;

export const router = express.Router();

//username and password
// const myusername = 'user1'
const mypassword = 'mypassword'


router.get('/',(req,res) => {
    let session=req.session;
    console.log("Entering")
    console.log(session.userid);
    if(session.userid){
        res.send(`Welcome User ${session.userid} <a href=\'/logout'>click to logout</a>`);
    }
    else {
        res.sendFile('app.html', { root: path.join(__dirname,'/views') });
    }
});

router.post('/user',(req,res) => {
    if( /*req.body.username == myusername &&*/ req.body.password == mypassword){
        let session=req.session;
        session.userid=req.body.username;
        console.log(session.userid);
        res.send(`Hey there ${session.userid}, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});