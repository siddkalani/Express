const constants =  require("../constants/errorConstants")
const errorHandler = (err , req , res, next) =>{
    const statusCode = res.statusCode ? res.statusCode:500;
    res.status(statusCode)
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"validation error",
                message: err.message
            })
        break;

        case constants.AUTH_ERROR:
            res.json({
                title:"Authorization error",
                message: err.message
            })
        break;

        case constants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message: err.message
            })
        break;

        case constants.SERVER_ERROR:
            res.json({
                title:"server error",
                message: err.message
            })
        break;

        default:
            case constants.SERVER_ERROR:
            res.json({
                title:"unknown",
                message: err.message
            })
        break;

    }
}

module.exports = errorHandler;