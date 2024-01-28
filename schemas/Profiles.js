const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    security_code: String,
    link_type: String,
    link_content: String,
    field: String,
    course: Number,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    projects: [{
        shortid: String,
        title: String,
        category: String,
        language: String,
        url: String,
        image: String,
        likes: Number
    }],
    results: [{
        shortid: String,
        title: String,
        category: String,
        semester: Number,
        format: String,
        percent: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)