const user = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        let hashedPassword = await bcrypt.hash(password, 10);
        let userData = new user({ name, email, password: hashedPassword });
        await userData.save();
        res.json({ status: 1, msg: "User registered successfully", data: { "_id": userData._id } });
    } catch (err) {
        res.json({ status: 0, msg: err.errorResponse.errmsg, data: {} });
    }
};

exports.login = async (req, res, next) => {
    let { email, password } = req.body;
    try {
        const userData = await user.findOne({ email });
        if (userData) {
            let passwordMatch = await bcrypt.compare(password, userData.password);
            if (!passwordMatch) {
                return res.json({ status: 0, msg: "Invalid credentials", data: {} });
            }
            let token = jwt.sign({ userId: userData._id }, process.env.tokenSecret, { expiresIn: "1h" });
            res.json({ status: 1, msg: "User logged in successfully", data: { "token": token } });
        } else {
            res.json({ status: 0, msg: "Invalid credentials", data: {} });
        }
    } catch (err) {
        res.json({ status: 0, msg: err, data: {} });
    }
};

exports.checkAuth = async (req, res) => {
    res.json({ status: 1, msg: "User authenticated", data: {} });
};