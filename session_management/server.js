import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { router } from './router.js';

let redisStore = connectRedis(session);
const client  = redis.createClient();
const app = express();

/*
Tried this for latest version of redis but didnt solve the issue
(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));
*/
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    saveUninitialized: false,
    resave: false
}));

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./views'));

app.use('/', router);

app.listen(process.env.PORT || 3000,() => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});