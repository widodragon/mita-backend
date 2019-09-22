const User = require('./../db/models').User;
const Token = require('./../db/models').Token;
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);

class UserController {
    async index(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            try{
                const user = await User.findAll()
                res.send(200, user)
                return next()
            }catch(err){
                console.log(err)
            }
        }else{
            return response.status(401).json({ message: 'Missing or invalid token' })
        }
    }
    async create(req, res, next) {
        try{
            const check=await User.findAll({
                where: {
                  email: req.body.email
                }
              });
            if(check.length>0){
                return res.json({message:'please choose another username!'});
            }else{
                const user = await User.create(req.body)
                res.status(200).send(user)
                return next()
            }
        }catch(err){
            return res.status(401).json({ message: 'please chech your fields!' })
        }
    }
    async check(req, res, next) {
        try{
            const data = await Token.findAll({
                limit: 1,
                where: {
                    token: req.params.token
                },
                order: [ [ 'createdAt', 'DESC' ]]
            })
            const string=JSON.stringify(...data);
            const obj=JSON.parse(string);
            const user = await User.findAll({
                where: {
                    email: obj.email
                }
            })
            res.status(200).send(user)
            return next()
        }catch(err){
            return res.status(401).json({ message: 'Missing or invalid token' })
        }
    }
    async signin(req, res, next){
        User.findOne({
            where: {
              email: req.body.email
            }
          })
          .then(user => {
            if (!user) {
              return res.json({message:'Authentication failed. Email not found.'});
            }else{
                user.comparePassword(req.body.password, (err, isMatch) => {
                  if(isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
                    jwt.verify(token, 'nodeauthsecret', function(err, data){
                      console.log(err, data);
                    })
                    const string=JSON.stringify(user);
                    const obj=JSON.parse(string);
                    console.log(obj.level);
                    if(obj.level=="1"){
                        var checkuser=[{
                                "email":req.body.email,
                                "token":'JWT ' + token
                            }];
                        saveToken(checkuser);
                        res.json({level: "Witel", token: 'JWT ' + token});
                        return next();
                    }else if(obj.level=="2"){
                        var checkuser=[{
                                "email":req.body.email,
                                "token":'JWT ' + token
                            }];
                        saveToken(checkuser);
                        res.json({level: "Datel", token: 'JWT ' + token});
                        return next();
                    }else if(obj.level=="3"){
                        var checkuser=[{
                                "email":req.body.email,
                                "token":'JWT ' + token
                            }];
                        saveToken(checkuser);
                        res.json({level: "Supervisor", token: 'JWT ' + token});
                        return next();
                    }else{
                        var checkuser=[{
                                "email":req.body.email,
                                "token":'JWT ' + token
                            }];
                        saveToken(checkuser);
                        res.json({level: "None", token: 'JWT ' + token});
                        return next();
                    }
                  } else {
                    res.status(200).json({ message: 'Authentication failed. Wrong password.' })
                    return next();
                  }
                })
            }
          }).catch(
          (error) => next(error)
          );
    }

    // update(req, res, next) {
    //     res.send(req.method)
    //     return next()
    // }

    async logout(req, res, next) {
        try{
            const token = await Token.destroy(
                {
                    where: {
                        token: req.params.token
                    }
                }
            )
            if(!token){
                res.send(500, {message: 'Token with the given was not found.'})
            }
            res.send(200, {message: 'Token has been deleted.'})
            return next()
        }catch(err){
            console.log(err)
        }
    }

    async resetPassword(req, res, next) {
        const email = req.body.email
        
        try{

        }catch(err){
            console.log(err)
        }
    }
}
getToken =(headers)=> {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
saveToken= async (checkuser)=>{
    try{
        const token = await Token.bulkCreate(checkuser);
    }catch(e){
        console.log(e);
    }
}
module.exports = new UserController()