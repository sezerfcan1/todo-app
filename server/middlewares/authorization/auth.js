const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const {isTokenIncluded , getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req,res,next) => {

    const {JWT_SECRET_KEY} = process.env;

    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this route", 401) );
    }

    const accessToken = getAccessTokenFromHeader(req);

    if (accessToken){
        const decoded= jwt.verify(accessToken, JWT_SECRET_KEY);
        req.user = {
            id: decoded.id,
            name: decoded.name
        };
        next();

    }else{
        return res.status(403).send({
            success: false,
            message: "No token provided"
        });
    } 

};



module.exports = {
    getAccessToRoute,
};