const {Schema, model} = require('mongoose') 

const Practices = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    university: String,
    faculty: String,
    semester: Number,
    invite_code: String,
    weekday: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    members: [{
        account_id: String,
        username: String,
        role: String,
        character: String
    }],
    tasks: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        level: String,
        deadline: String,
        status: String,
        image: String,
        likes: Number
    }]
})

module.exports = model('Practices', Practices)