const Schedule = require('./../db/models').Schedule;
const User = require('./../db/models').User;
const Token = require('./../db/models').Token;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const data = require('./../seeders/mobidum');
require('../config/passport')(passport);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ScheduleController {
    async pagination(req, res, next) {
        // var token = getToken(req.headers);
        // if (token) {
            const token = req.params.token
            const perPage = Number(req.params.limit) || 5
            const page = Number(req.params.page) || 1
            const offset = (perPage * page) - perPage
            const total = await Schedule.count()
            try{
                const data = await Token.findAll({
                    limit: 1,
                    where: {
                        token: req.params.token
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                })
                const stringData=JSON.stringify(...data);
                const objData=JSON.parse(stringData);
                console.log(objData.email);
                const user= await User
                .findAll({
                    include: [
                        {
                            model:Schedule,
                            as:'schedule',
                            offset : offset,
                            limit : perPage,
                            order: [
                                ['date', 'DESC']
                            ]
                        }
                    ],
                    where: {
                        email: objData.email
                    }         
                });
                const string=JSON.stringify(...user);
                const obj=JSON.parse(string);
                res.status(200).json({
                    schedule: obj.schedule,
                    page: page,
                    perPage : perPage,
                    total : total
                });
            }catch(err){
                return res.status(400).json({message:'result is empty!'});
            }
        // }else{
        //    return response.status(401).json({ message: 'Missing or invalid token' }) 
        // }
    }
    async index(req, res, next) {
        // var token = getToken(req.headers);
        // if (token) {
            const token = req.params.token;
            var dateTime = require('node-datetime');
            var dt = dateTime.create();
            var formatted = dt.format('Y-m-d');
            console.log(formatted);
            try{
                const data = await Token.findAll({
                    limit: 1,
                    where: {
                        token: req.params.token
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                })
                const stringData=JSON.stringify(...data);
                const objData=JSON.parse(stringData);
                console.log(objData.email);
                const user= await User
                .findAll({
                    include: [
                        {
                            model:Schedule,
                            as:'schedule',
                            where: {
                                date: formatted
                            }
                        }
                    ],
                    where: {
                        email: objData.email
                    }           
                });
                const string=JSON.stringify(...user);
                const obj=JSON.parse(string);
                res.status(200).json({
                    schedule: obj.schedule
                });
            }catch(err){
                return res.status(400).json({message:'result is empty!'});
            }
        // }else{
        //     return response.status(401).json({ message: 'Missing or invalid token' })  
        // }
    }
    async create(req, res, next) {
        // var token = getToken(req.headers);
        // if (token) {
            try{
                const schedule = await Schedule.bulkCreate(data)
                res.status(201).json(schedule)
                return next()
            }catch(err){
                return res.status(400).json({message:'please chech your fields!'});
            }
        // }else{
        //     return response.status(401).json({ message: 'Missing or invalid token' })  
        // }
    }

    async search(req, res, next){
        // var token = getToken(req.headers);
        // if (token) {
            const token = req.params.token;
            try{
                const data = await Token.findAll({
                    limit: 1,
                    where: {
                        token: req.params.token
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                })
                const stringData=JSON.stringify(...data);
                const objData=JSON.parse(stringData);
                console.log(objData.email);
                if(req.params.search!=''){
                    const user= await User
                    .findAll({
                        include: [
                            {
                                model:Schedule,
                                as:'schedule',
                                where: {
                                    mobi: {
                                        [Op.like]:'%'+req.params.search+'%'
                                    }
                                }
                            }
                        ],
                        where: {
                            email: objData.email
                        }            
                    });
                    const string=JSON.stringify(...user);
                    const obj=JSON.parse(string);
                    res.status(200).json(obj.schedule);
                }
            }catch(e){
                return res.status(400).json({message:'result is empty!'});
            }
        // }else{
        //     return response.status(401).json({ message: 'Missing or invalid token' })  
        // }
    }

    async update(req, res, next) {
        // var token = getToken(req.headers);
        // if (token) {
            const id=req.params.id;
            const {date,time,mobi,sales,latitude,longitude}=req.body;
            try{
               const item=await Schedule.update({
                    date:date,
                    time:time,  
                    mobi:mobi,
                    sales:sales,
                    lat:latitude,
                    lon:longitude     
                },{
                    where:{
                        id:id
                    }
                });
                res.json(200, item);
                return next()
            }catch(e){
                next(e);
            }
        // }else{
        //     return response.status(401).json({ message: 'Missing or invalid token' })  
        // }
    }

    async delete(req, res, next) {
        // var token = getToken(req.headers);
        // if (token) {
            try{
                const schedule = await Schedule.destroy(
                    {
                        where: {id: req.params.id}
                    }
                )
                if(!schedule){
                    res.send(404, {message: 'Schedule with the given ID was not found.'})
                }
                res.send(200, {message: 'Schedule has been deleted.'})
                return next()
            }catch(err){
                console.log(err)
            }
        // }else{
        //     return response.status(401).json({ message: 'Missing or invalid token' })  
        // }
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
module.exports = new ScheduleController()