const {Schema, model} = require('mongoose') 

const Tutors = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    fullname: String,
    category: String,
    institution: String,
    subjects: [String],
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    url: String,
    grade: Number,
    image: String,
    quotes: [{
        shortid: String,
        text: String,
        category: String,
        subject: String,
        likes: Number
    }],
    reviews: [{
        shortid: String,
        name: String,
        criterion: String,
        period: String,
        rating: Number
    }]
})

module.exports = model('Tutors', Tutors)