const User = require("../models/User");
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const { getUserWithToken } = require("../helpers/authorization/tokenHelpers");


const getSingleUser = asyncErrorWrapper( async (req,res,next) => {
    const user = getUserWithToken(req);

    var condition = {}

    condition.id = user.id

    const userDetails = await User.findOne({where : condition})

    if(!user){
        return next(new CustomError("There is no such user with that id",400));
    }

    return res.status(200)
    .json({
        userDetails
    });
});

module.exports = { getSingleUser }