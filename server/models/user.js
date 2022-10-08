const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    id : {
        type: String, 
        required: true, 
    }, 
    email : {
        type: String, 
        require: true
    }, 
    password: {
        type: String,
        required: true
    }
}); 

module.exports = mongoose.model('User', userSchema);