function statusChecker(req, res, next) {
    console.log("This middleware runs only for /api/status");

    next();
}

function secondChecker(req, res, next) {
    console.log("Second Middleware");

    next();
}

function riskChecker(req, res, next) {
    console.log("Risk route middleware is running...");

    next();
}

function sensorChecker(req, res, next) {
    console.log("Sensor middleware is running...");

    next();
}

module.exports = {
    statusChecker,
    secondChecker,
    riskChecker,
    sensorChecker
};