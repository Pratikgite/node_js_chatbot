const user = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        bcrypt.hash(password, 10).then(async (hash) => {
            await user.create({ name, email, password: hash })
                .then((response) => {
                    res.send({ status: 1, msg: "User registered successfully", data: { "_id": response._id } });
                })
                .catch((err) => {
                    console.log("error: ", err);
                    res.send({ status: 0, msg: err, data: {} });
                });
        });
    } catch (err) {
        res.send({ status: 0, msg: err, data: {} });
    }
};

exports.login = async (req, res, next) => {
    let { email, password } = req.body;
    try {
        const userData = await user.findOne({ email });
        if (userData) {
            bcrypt.compare(password, userData.password).then(function (result) {
                result
                    ? res.send({ status: 1, msg: "User logged in successfully", data: { "_id": userData._id } })
                    : res.send({ status: 0, msg: "User not found", data: {} });
            });
        } else {
            res.send({ status: 0, msg: "User not found", data: {} });
        }
    } catch (err) {
        res.send({ status: 0, msg: err, data: {} });
    }
};