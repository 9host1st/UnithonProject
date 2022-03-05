//const { append } = require('express/lib/response');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const TimeStamp = require('../Schemas/timestamp');
const Board = require('../Schemas/board');
router.use(express.json());

const uri = "mongodb+srv://9host1st:pt197080@cluster0.eshts.mongodb.net/jaebidabang?retryWrites=true&w=majority";
router.use(express.json());
try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected"));
} catch (err) {
    console.log("connect fail");
}

router.use(function (req, res, next) {
    next();
})

router.get('/:id', (req, res, next) => { // 타임스탬프 전체 조회
    const { id } = req.params;
    const timestamps = TimeStamp.find({ userID: id });
    console.log(timestamps)
    res.send('find all timestamp')
});

router.get('/:id/:stampid', function (req, res, next) { //유저 id가 추가한 stampid번 타임스탬프의 게시물 조회
    TimeStamp.find({ id: req.params.id, _id: req.params.stampid })
        .then((timestamp) => {
            res.sendStatus(204);
            console.log("find board Success");
            res.json(timestamp);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        })
});

router.post('/:id', function (req, res, next) { //타임스탬프 추가
    let newTimeStamp = new TimeStamp(req.body);
    newTimeStamp.save()
        .then((timestamp) => {
            console.log("Upload Success");
            console.log(newTimeStamp);
            res.send('add new timestamp')
            res.sendStatus(204);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        });
});

router.post('/:id/:stampid', function (req, res) { //stampid번 타임스탬프에 게시글 추가
    let newBoard = new Board(req.body);
    newBoard.save()
        .then((timestamp) => {
            console.log("Upload Success");
            console.log(newBoard);
            res.send('add new Board')
            res.sendStatus(204);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error(err);
            next(err);
        });
    const timestamps = TimeStamp.find({ userID: req.params.id, _id: req.params.stampid });
    const originObjectID = timestamps.objectID;
    originObjectID.push(req.body._id)
    timestamps.objectID = originObjectID;
});

router.put('/:id/:stampid/:postid', function (req, res) { //id가 추가한 stampid번에 postid번 게시글 수정
    const newBoard = req.body;
    let foundBoard = Board.find({ id: req.params.id, timestampID: req.params.stampid, _id: req.params.postid });
    foundBoard = newBoard;
    foundBoard.save()
});

router.delete('/:id/:stampid', function (req, res) { //id가 추가한 stampid번 타임스탬프 삭제
    TimeStamp.deleteOne({ id: req.params.id, _id: req.params.stampid })
        .then((timestamp) => {
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