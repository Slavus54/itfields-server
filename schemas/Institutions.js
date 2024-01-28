const {Schema, model} = require('mongoose') 

const Institutions = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    url: String,
    main_photo: String,

})

module.exports = model('Institutions', Institutions)