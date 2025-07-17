const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

const DB_URL = process.env.DB; 
const DB_NAME = "tedx_weaver_db";

module.exports = connect_to_db = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }
 
    console.log('=> using new database connection');
    return mongoose.connect(DB_URL, {
        dbName: DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(db => {
        isConnected = db.connections[0].readyState;
    });
};
