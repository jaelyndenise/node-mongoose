const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server.');

    //Different way to instantiate a document from a model
    //.create() defines the new document and automatically saves it (so you don't need .save() method), then returns the new document as the value for the promise
    Campsite.create({
        name: 'React Lake Campground',
        description: 'Test',
    })
    .then(campsite => {
        console.log(campsite);

        //accessing the Campsite(campsites) collection to update the document with the ID of the campsite that was created
        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document' }
        }, {
            //will cause .findByIdAndUpdate() to return the updated document object, otherwise, it returns the original doc by default
            new: true
        }); 
    })
    .then(campsite => {
        console.log(campsite);

        //FOR SOME REASON COMMENTS GETS AN ERROR "Cannot read property 'comments" of null (for some reason, the campsite is coming back as null instead of an object)
        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: "Tinus Loream"
        });

        //need to return campsite.save in order for comments update to take effect
        return campsite.save();
    })
    //this .then() method is now going to console.log the update campsite document instead of all of the campsite documents
    .then(campsite => {
        console.log(campsite);
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

