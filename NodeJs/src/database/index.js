const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://18100156:CyOZztObkgk2cBYO@haidangphan.csbml4t.mongodb.net/ZingMp3?retryWrites=true&w=majority',
            {},
        );
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect };
