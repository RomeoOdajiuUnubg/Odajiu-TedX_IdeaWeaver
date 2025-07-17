const mongoose = require('mongoose');

const speker_schema = new mongoose.Schema({
    
_id: String,
talks: Object,
unique_tags_list: Object,
total_tags_count: Number,
unique_tags_count: Number,
specialization_score: Number
}, { collection: 'speaker_profiles' });

module.exports = mongoose.model('SpeakerProfile', speker_schema);