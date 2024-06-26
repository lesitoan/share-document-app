

module.exports = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    if (err.statusCode === 500) {
        err.message = 'Something error from server !!!';
    }
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
};