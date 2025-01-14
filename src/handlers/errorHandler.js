function handleErrors(err, req, res, next){
    const statusCode = err.statusCode || 500;
    console.log(err.message, err.stack);
    res.status(statusCode).send(err.message)
}

module.exports = handleErrors;