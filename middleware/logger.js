function logger(req, res, next){
    console.log(new Date().toISOString());
    console.log("Request method: ", req.method());
    console.log("Request URL: ", req.url());

    next();
}

module.exports = logger;