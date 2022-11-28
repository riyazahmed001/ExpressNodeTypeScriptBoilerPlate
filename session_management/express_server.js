import express from 'express';
import sessions from 'express-session';
import cookieParser from 'cookie-parser';
import { router } from './express_router.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) ;

const app = express();
const PORT = 4000;

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static('./views'));

// cookie parser middleware
app.use(cookieParser());

app.use('/', router);

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
