const mongoose = require('mongoose');

const talk_schema = new mongoose.Schema({
    _id: String,
    title: String,
    peaker: String,
    date: String,
    duration: String,
    url: String,
    description: String,
    images: Object,
    related_videos: Object,
    tags: Object
}, { collection: 'talks' });

module.exports = mongoose.model('talk', talk_schema);
