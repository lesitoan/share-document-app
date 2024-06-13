
module.exports = (callBack) => {
    return async (req, res, next) => {
        try {
            await callBack(req, res, next);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
};