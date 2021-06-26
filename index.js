const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server.');

    //Different way to instantiate a document from a model
    //.create() defines the new document and automatically saves it (so you don't need .save() method)
    Campsite.create({
        name: 'React Lake',
        description: 'Test'
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.find(); 
    })
    .then(campsites => {
        console.log(campsites);
        return Campsite.deleteMany(); 
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    })
});

