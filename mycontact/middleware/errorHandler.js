const constants =  require("../constants/errorConstants")
const errorHandler = (err , req , res, next) =>{
    const statusCode = res.statusCode ? res.statusCode:500;
    res.status(statusCode)
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"auth error",
                message: err.message
            })
        break;

        case 400:
            res.json({
                title:"validation failed",
                message: err.message
            })
        break;

        case 404:
            res.json({
                title:"Not Found",
                message: err.message
            })
        break;

        case 500:
            res.json({
                title:"server error",
                message: err.message
            })
        break;

        default:
            case 500:
            res.json({
                title:"alag",
                message: err.message
            })
        break;

    }
}

module.exports= (errorHandler)