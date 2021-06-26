const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//first argument: fields
//second argument (optional): used to set config options
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    //mongoose adds createdAt and updatedAt properties to each instance
    timestamps: true
});

//First argument: model name - mongoose will automatically find the lower-ase/plural version of the first parameter
//to locate the colletion that should be used for this model
//Second argument: schema (template) to use
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;