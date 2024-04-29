const initailzeEndPoint = (app) => {
    app.use('/auth', require("./auth"));
}
module.exports = initailzeEndPoint;