const CustomError = require("../handlers/customError");

function checkPermissions(req, res, next){

    if (req.user.role !== 'admin' && req.params.userLogin !== req.user.login){
        throw new CustomError(403, "Access denied!")
    }
    next();
}

module.exports = {checkPermissions};