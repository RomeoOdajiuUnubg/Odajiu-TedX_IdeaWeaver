const mongoose = require('mongoose');

const graph_schema = new mongoose.Schema({
    _id: String,
    source: String,
    target: String,
    weight: Number
}, { collection: 'tag_graph' });

module.exports = mongoose.model('TagGraph', graph_schema);
