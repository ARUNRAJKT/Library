var jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try {
        console.log(req)
        const token=req.headers.authorization.split(" ")[1];
        console.log(token)
        const decodedToken=jwt.verify(token,"aaa")
        console.log(decodedToken);
        req.userData={id:decodedToken.loginId}
        next();
    } catch (error) {
        res.status(401).json({message:'Authentication Failed!'})
    }
}