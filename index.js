var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

/*
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("mongo connection open")
    })
    .catch(err => {
        console.log("oh no mongo connection error")
        console.log(err)
    })
*/

const boardRouter = require('./routes/board');
const timestampRouter = require('./routes/timestamp');

app.use('/board', boardRouter);
app.use('/timestamp', timestampRouter);

app.get('/', (req, res) => {
    res.send("hihi");
});

app.listen(3000, () => console.log('Server On 3000'));

/*
const uri = 'mongodb://127.0.0.1:27017/jaebidabang';
var db = mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Succesfully Connected!');
    }
});

var UserSchema = new mongoose.Schema({
    password: String,
    name: String,
    id: String,
    datetime: Date,
    nickname: String,
    friends: String,
});

var Users = mongoose.model('users', UserSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '1gb', extended: false }));

app.post('/signup', (req, res) => {
    var new_user = new Users(req.body);
    new_user.save((err) => {
        if (err) return res.status(500).json({ message: 'fail!' });
        else return res.status(200).json({ message: 'success!', data: new_user });
    });
});

app.post('/signin', (req, res) => {
    Users.findOne({ id: req.body.id, password: req.body.password }, (err, user) => {
        if (err) return res.status(500).json({ message: 'error!' });
        else if (user) return res.status(200).json({ message: 'find', data: user });
        else return res.status(404).json({ message: 'unfind' });
    });
});*/
