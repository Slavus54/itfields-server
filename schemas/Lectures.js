const {Schema, model} = require('mongoose') 

const Lectures = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    university: String,
    subject: String,
    course: Number,
    criterion: String,
    rating: Number,
    conspects: [{
        shortid: String,
        name: String,
        text: String,
        format: String,
        timestamp: Number,
        image: String,
        likes: Number
    }],
    sources: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        url: String
    }]
})

module.exports = model('Lectures', Lectures)