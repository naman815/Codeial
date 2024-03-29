const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){
    try {
        let user = User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : "Unauthorised User"
            });
        }
        return res.json(200,{
            message: "Sign in successful here is your token , please keep it safe",
            data : {
                token : jwt.sign(user.toJSON(), 'codeial', {expiresIn : '10000'})
            }
        })

    } catch (error) {
        console.log('*****',error);
        return res.json(500,{
            message : "Internal Server Error"
        })
    }
}