const express = require('express');
const app = express();
const bcrypt= require('bcryptjs');
const cors =require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile')

const db = knex({
    client: 'pg',
        connection: {
        host : '127.0.0.1',
        user : 'mahmut',
        password : '25252',
        database : 'face-recog'
    }
})

db.select('*').table('login').then(data => console.log);

app.use(cors());
app.use(express.json());

app.get('/', (err, res) => {
    if(err) {
        console.log(err);
    }
    res.json(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)}) //Alternative--- signin.handleSignin(db, bcrypt)

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.post('/imageurl', (req,res) => {image.handleApiRequest(req, res)})

app.put('/image', (req,res) => {image.handleImage(req, res, db)})

app.listen(3000, () => console.log('server is running on port 3000'));

/*
/ --> res = server is running
/signin --> POST , res = success/fail
/register --> POST, res = user
/profile/:id --> GET, res = user
/image --> PUT, res = user/user.rank
*/