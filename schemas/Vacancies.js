const {Schema, model} = require('mongoose') 

const Vacancies = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    position: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    experience: Number,
    url: String,
    questions: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        level: String,
        answer: String,
        accepted: Boolean
    }],
    photos: [{
        shortid: String,
        title: String,
        format: String,
        image: String,
        dateUp: String,
        likes: Number
    }]
})

module.exports = model('Vacancies', Vacancies)