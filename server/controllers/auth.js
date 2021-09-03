const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput , comparePassword} = require("../helpers/input/inputHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");

const register = asyncErrorWrapper(async(req, res, next) => {
    const {name,email,password,surname,birthdate,aboutUs,profileImage,activationCode,isActive,activeAt,isModified} = req.body;

        const user = await User.create({
            name,
            email,
            password,
            surname,
            birthdate,
            aboutUs,
            profileImage,
            activationCode,
            isActive,
            activeAt,
            isModified
        });

        const activationToken = user.getActivationToken()

        const activationUrl = `http://localhost:5001/register/activation?activationToken=${activationToken}`;

        const emailTemplate = `
        <h2>Hoşgeldin ${user.name}  ${user.name} </h2>
        <h3>Aktivasyon Linki</h3>
        <p><a href = '${activationUrl}' target= '_blank'>link</a></p>
        `;
    
        try {
            await sendEmail({
                from : process.env.SMTP_USER,
                to : email,
                subject: "Aktivasyon",
                html : emailTemplate
            });
    
            return res.status(200).json({
                success: true,
                message: "Link send to your email"
            })
    
        } catch (error) {
    
            return next(new CustomError("Email Could Not Be Send", 500));
        }
    
});

const activation = asyncErrorWrapper(async (req, res, next)=> {

    const {activationToken} = req.query;

    if(!activationToken){
        return next(new CustomError("Please provide a valid token",400));
    }

    let user = await User.findOne({
        activationToken : activationToken,
    });

    if(!user){

        return next(new CustomError("Invalid Token or Session Expired",400));
    }

    if (user.activationToken == activationToken) {
        user.isActive = true;
    }


    await user.save();

    return res.status(200)
    .json({
        success: true,
        message: "Activation Process Successful"
    });
});

const login = asyncErrorWrapper(async (req , res, next) => {

    const {email,password} = req.body;
    
    if(!validateUserInput(email,password)) {
        return next(new CustomError("Please check your input", 400 ));
    }

    const user = await User.findOne({where: {email: email}});

    if (!user) {
        return next(new CustomError("Please check your credentials",400));
    }

    if(!comparePassword(password,user.password)){
        return next(new CustomError("Please check your credentials",400));
    }

    user.update({activeAt : Date.now()});

    sendJwtToClient(user,res);

});

const imageUpload = asyncErrorWrapper(async (req,res,next)=>{

    const user = await User.findOne({where : {id: req.user.id}});

    user.update({
        profileImage : req.savedProfileImage
    })
    user.update({
        updatedAt : Date.now()
    })

    res.status(200)
    .json({
        success: true,
        message: "Image Upload Successfull",
        data : user
    });
});

const forgotPassword = asyncErrorWrapper(async (req, res, next ) => {

    const resetEmail = req.body.email;

    const user = await User.findOne({email: resetEmail});

    if(!user){
        return next(new CustomError("There is no user with that email",400));
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save();

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p> This <a href = '${resetPasswordUrl}' target= '_blank'>link</a> will expire in 1 hour </p>
    `;

    try {
        await sendEmail({
            from : process.env.SMTP_USER,
            to : resetEmail,
            subject: "Reset Your Password",
            html : emailTemplate
        });

        return res.status(200).json({
            success: true,
            message: "Token send to your email"
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new CustomError("Email Could Not Be Send", 500));
    }



})


const logout = asyncErrorWrapper(async (req , res, next) => {
    const {NODE_ENV} = process.env;

    return res.status(200)
    .cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message : "Logout Successfull"
    })


});

const resetPassword = asyncErrorWrapper(async (req, res, next)=> {

    const {resetPasswordToken} = req.query;

    const {password} = req.body;

    if(!resetPasswordToken){
        return next(new CustomError("Please provide a valid token",400));
    }

    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    });

    if(!user){

        return next(new CustomError("Invalid Token or Session Expired",400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.isModified = false;

    await user.save();

    return res.status(200)
    .json({
        success: true,
        message: "Reset Password Process Successful"
    });
});


const getUser = (req,res,next) => {
    res.json({
        success: true,
        data: {
            id : req.user.id,
            name: req.user.name
        }
    });
};

const editDetails = asyncErrorWrapper(async (req, res, next) => {

    const user = await User.findOne({id: req.body.id});

    user.name = req.body.name;
    user.surName = req.body.surname;
    user.aboutUs = req.body.aboutUs;
    user.email = req.body.email;
    user.birthdate = req.body.birthdate;
    user.isModified = true;
    user.save();
    

    return res.status(200).json({
        success: true,
        data: user
    });
});



module.exports = {
    editDetails,
    imageUpload,
    register,
    login,
    logout,
    getUser,
    forgotPassword,
    resetPassword,
    activation
}