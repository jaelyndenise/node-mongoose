const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

//automatically connects to nucmapsite db in mongodb server
const url = 'mongodb://localhost:27017/nucampsite';
//connect to url using mongoose.connect which is wrapper around MongoDB Node driver connect method
//connect method returns a promise, so you can attach a .then()
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server.');

    //instantiating a new document using the Campsite model
    const newCampsite = new Campsite({
        name: 'React Lake',
        description: 'Test'
    });

    //.save() is a mongoose method that will save the instance to the db and return a promise that will say whether the save failed or succeeded
    //if succeeded, resolves w/ saved campsite
    newCampsite.save()
    .then(campsite => {
        console.log(campsite);
        return Campsite.find(); //returns array of campsite objects
    })
    .then(campsites => {
        console.log(campsites);
        return Campsite.deleteMany(); //deletes all documents that use the Campsite model
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    })
});