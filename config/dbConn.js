const mongoose = require('mongoose');

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true
    },
    dbName: 'skillspotaustralia'
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, clientOptions);
    } catch (err) {
        console.log('Sorry !!! An Error Occured While Connecting To Database' + err);
    }
}

module.exports = connectDB;