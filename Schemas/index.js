const mongoose = require('mongoose');

const uri = "mongodb+srv://9host1st:<password>@cluster0.eshts.mongodb.net/jaebidabang?retryWrites=true&w=majority";

mongoose.connect(
    uri,
    { useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
        console.log("Mongodb Connect Success");
    })
    .catch((err) => {
        console.log(err);
    });
