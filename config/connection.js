const { mongoose } = require('mongoose');

exports.dbcon = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("error: ", err);
    }
};