const mongoose = require('mongoose')

const trackScema = mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true}
})

const Track = mongoose.model('Track', trackScema)

module.exports = Track