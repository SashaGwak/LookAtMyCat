const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const catSchema = new Schema({
    writer: {
        type: String, 
        require: true,
    },
    title: {
        type: String, 
        require: true,
    }, 
    description: {
        type: String,
        require: true,
    }, 
    imageUrl: {
        type: String,
    }, 
}); 

module.exports = mongoose.model('Cat', catSchema);