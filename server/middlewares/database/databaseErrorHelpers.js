const User = require("../../models/User");
const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {getUserWithToken} = require("../../helpers/authorization/tokenHelpers")

const checkUserExist = asyncErrorWrapper(async (req,res,next)=>{
    
    const user = getUserWithToken(req)

    const userDetails = await User.findById(user.id);

    console.log(userDetails)

    if(!userDetails){
        return next(new CustomError("There is no such user with that id",400));
    }

    next();

});

module.exports = {checkUserExist}