const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res, next) =>{


    // First check request headers has authorization or not
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).json({error: 'Token not found'});
    }

    // Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: "Unauthorized"});
    try{

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({error: "Invalid token"});
    }
}


// function to generate JWT token
// const generateToken = (userData) => {
//     // Generate a new JWT token using userData
//     const token =  jwt.sign({userData}, process.env.JWT_SECRET_KEY,{expiresIn: 30000});
//     return token;
// }
const generateToken = (userData) => {
    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
}


module.exports = {jwtAuthMiddleware, generateToken} 