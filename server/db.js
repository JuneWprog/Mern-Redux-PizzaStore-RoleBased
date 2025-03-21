require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
    connectDB: async function connectDB() {
        try {
            await mongoose.connect(process.env.DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (error) {
            console.log(error);
        }
    },
};