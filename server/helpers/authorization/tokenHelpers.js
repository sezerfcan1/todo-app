const jwt = require('jsonwebtoken');

const sendJwtToClient = (user,res) => {

    const token = user.generateJwtFromUser(user);
    const {JWT_COOKIE,NODE_ENV} = process.env;
    const ex = new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60);

    return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly: true,
        expires: ex,
        secure : NODE_ENV === "development" ? false : true,
    })
    .json({
        success : true,
        access_token : token,
        id: user.id,
        data : {
            name: user.name,
            email: user.email
        }
    });

};

const isTokenIncluded = req => {
    return (req.headers.authorization && req.headers.authorization.startsWith('Bearer'));
}

const getAccessTokenFromHeader = (req)=> {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ");
    return access_token[1];
}

const getUserWithToken = (req) => {

    const accessToken = getAccessTokenFromHeader(req);
    const {JWT_SECRET_KEY} = process.env;

    if (accessToken){
        const decoded= jwt.verify(accessToken, JWT_SECRET_KEY);
        const user = {
            id: decoded.id,
            name: decoded.name
        };
        return user;

    }else{
        return res.status(403).send({
            success: false,
            message: "No token provided"
        });
    } 

};

module.exports = {sendJwtToClient,isTokenIncluded,getAccessTokenFromHeader,getUserWithToken};