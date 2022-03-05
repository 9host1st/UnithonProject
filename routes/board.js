const express = require('express');
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const router = express.Router();
const Board = require('../Schemas/board');
const TimeStamp = require('../Schemas/timestamp');
const uri = "mongodb+srv://9host1st:pt197080@cluster0.eshts.mongodb.net/jaebidabang?retryWrites=true&w=majority";
router.use(express.json());
try {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("connected"));
} catch(err) {
    console.log("connect fail");
}
router.use(function(req, res, next) {
    next();
});

router.post('/:id', (req, res, next) => { /* post upload */
    parsing = req.body; /* object */
    let uploads = new Board(parsing); /* object */
    uploads.save()
        .then((board) => {
            if(uploads['isTimestamp'] == true) {
                const timestampID = uploads.timestampID;
                const timestampPostID = uploads.timestampPostID;
                const timestampSharefriends = uploads.sharefriends;
                const timeInterval = uploads.timeinterval;
                const limit = uploads.limits;
                /*console.log(timestampID, timestampPostID, timestampSharefriends, timeInterval, limit);*/
                /*console.log(TimeStamp.findByIdAndUpdate({objectID: timestampID}, { $push: { postID: timestampPostID }, $set : {sharefriends: timestampSharefriends, timeinterval: timeInterval, limits: limit}}));*/
            }
            console.log("Upload Success");
            res.sendStatus(204);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        });
});

router.get('/:id', (req, res, next) => { /* post search */
    Board.find({id : req.params.id })
        .then((board) => {
            res.sendStatus(204);
            console.log("find Success");
            res.json(board);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        })
});

router.get('/:id/:objectID', (req, res, next) => { 
    Board.findOne({id : req.params.id, objectID: req.params.objectID})
        .then((board) => {
            res.sendStatus(204);
            console.log("find Success");
            res.json(board);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        })
});


router.delete('/:id', (req, res, next) => { /* post all delete */
    Board.deleteMany({id: req.params.id})
        .then((board) => {
            res.sendStatus(204);
            console.log("Delete Success");
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        })
});

router.put('/:id/:objectID', (req, res, next) => { /* post edit */
    Board.findOne({id: req.params.id, objectID: req.params.objectID})
        .then((board) => {
            _id = board['_id'];
            console.log(_id);
            parsing = req.body;
            console.log(typeof(parsing))
            console.log(parsing)
            Board.findByIdAndUpdate(_id, parsing)
                .then((board) => {
                    res.sendStatus(206);
                    console.log("Update Success");
                })
                .catch((err) => {
                    res.sendStatus(500);
                    console.error(err);
                    next(err);
                });
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        })
});

router.delete('/:id/:objectID', (req, res, next) => {
    Board.deleteOne({id: req.params.id, objectID: req.params.objectID})
        .then((board) => {
            res.sendStatus(206);
            console.log("Delete Success");
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        })
});

module.exports = router;
