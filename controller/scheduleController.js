const Schedule = require('./../db/models').Schedule;
const Regional = require('./../db/models').RegionalMaster;
const Witel = require('./../db/models').WitelMaster;
const Datel = require('./../db/models').DatelMaster;
const Agency = require('./../db/models').AgencyMaster;
const Sales = require('./../db/models').SalesMaster;
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
            const perPage = Number(req.params.limit) || 5
            const page = Number(req.params.page) || 1
            const offset = (perPage * page) - perPage
            const total = await Schedule.count()
            try{
                const objData=await getUserEmail(req.params.token);
                const objUser=await getUserLevel(objData.email);
                if(objUser.level===1){
                        const schedule= await Schedule
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sf',
                                    include: [
                                        {
                                            model:Agency,
                                            as:'agency',
                                            include: [
                                                {
                                                    model:Datel,
                                                    as:'datel',
                                                    include: [
                                                        {
                                                            model:Witel,
                                                            as:'witel',
                                                            where: {
                                                                name: objUser.name
                                                            }
                                                        }
                                                    ] 
                                                }
                                            ]           
                                        }
                                    ]
                                }
                            ],
                            offset : offset,
                            limit : perPage,
                            order: [
                                ['date', 'DESC']
                            ]       
                        });
                        res.status(200).json({
                            schedule:schedule,
                            page: page,
                            perPage : perPage,
                            total : total
                        });
                }else if(objUser.level===2){
                        const schedule= await Schedule
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sf',
                                    include: [
                                        {
                                            model:Agency,
                                            as:'agency',
                                            include: [
                                                {
                                                    model:Datel,
                                                    as:'datel',
                                                    where: {
                                                        name: objUser.name
                                                    }
                                                }
                                            ]           
                                        }
                                    ]
                                }
                            ],
                            offset : offset,
                            limit : perPage,
                            order: [
                                ['date', 'DESC']
                            ]       
                        });
                        res.status(200).json({
                            schedule:schedule,
                            page: page,
                            perPage : perPage,
                            total : total
                        });
                }else if(objUser.level===3){
                        const schedule= await Schedule
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sf',
                                    include: [
                                        {
                                            model:Agency,
                                            as:'agency',
                                            where: {
                                                name: objUser.name
                                            }         
                                        }
                                    ]
                                }
                            ],
                            offset : offset,
                            limit : perPage,
                            order: [
                                ['date', 'DESC']
                            ]       
                        });
                        res.status(200).json({
                            schedule:schedule,
                            page: page,
                            perPage : perPage,
                            total : total
                        });
                }
        }catch(err){
            return next(err)
        }
        // }else{
        //    return response.status(401).json({ message: 'Missing or invalid token' }) 
        // }
    }
    async index(req, res, next) {
        // var token = getToken(req.headers);
        // if (token) {
            var dateTime = require('node-datetime');
            var dt = dateTime.create();
            var formatted = dt.format('Y-m-d');
            console.log(formatted);
            try{
                const objData=await getUserEmail(req.params.token);
                const objUser=await getUserLevel(objData.email);
                if(objUser.level===1){
                    const schedule= await Schedule
                    .findAll({
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        include: [
                                            {
                                                model:Datel,
                                                as:'datel',
                                                include: [
                                                    {
                                                        model:Witel,
                                                        as:'witel',
                                                        where: {
                                                            name: objUser.name
                                                        }  
                                                    }
                                                ] 
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        where: {
                            date: formatted
                        }         
                    });
                    res.status(200).json({
                        schedule: schedule
                    });
                }else if(objUser.level===2){
                    const schedule= await Schedule
                    .findAll({
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        include: [
                                            {
                                                model:Datel,
                                                as:'datel',
                                                where: {
                                                    name: objUser.name
                                                } 
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        where: {
                            date: formatted
                        }         
                    });
                    res.status(200).json({
                        schedule: schedule
                    });
                }else if(objUser.level===3){
                    const schedule= await Schedule
                    .findAll({
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        where: {
                                            name: objUser.name
                                        } 
                                    }
                                ]
                            }
                        ],
                        where: {
                            date: formatted
                        }         
                    });
                    res.status(200).json({
                        schedule: schedule
                    });
                }                
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
                const objData=await getUserEmail(req.params.token);
                const objUser=await getUserLevel(objData.email);
                if(objUser.level===1){
                    const schedule = await Schedule.bulkCreate(data,{
                         include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        include: [
                                            {
                                                model:Datel,
                                                as:'datel',
                                                include: [
                                                    {
                                                        model:Witel,
                                                        as:'witel',
                                                        where: {
                                                            name: objUser.name
                                                        }
                                                    }
                                                ] 
                                            }
                                        ]           
                                    }
                                ]
                            }
                        ]                       
                    })
                    res.status(201).json(schedule)
                    return next()
                }else if(objUser.level===2){
                    const schedule = await Schedule.create(req.body,{
                         include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        include: [
                                            {
                                                model:Datel,
                                                as:'datel',
                                                where: {
                                                    name: objUser.name
                                                }
                                            }
                                        ]           
                                    }
                                ]
                            }
                        ]                       
                    })
                    res.status(201).json(schedule)
                    return next()
                }else if(objUser.level===3){
                    const schedule = await Schedule.create(req.body,{
                         include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        where: {
                                            name: objUser.name
                                        }          
                                    }
                                ]
                            }
                        ]                       
                    })
                    res.status(201).json(schedule)
                    return next()
                }
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
            try{
                const objData=await getUserEmail(req.params.token);
                const objUser=await getUserLevel(objData.email);
                if(objUser.level===1){
                        const schedule= await Schedule
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sf',
                                    include: [
                                        {
                                            model:Agency,
                                            as:'agency',
                                            include: [
                                                {
                                                    model:Datel,
                                                    as:'datel',
                                                    include: [
                                                        {
                                                            model:Witel,
                                                            as:'witel',
                                                            where: {
                                                                name: objUser.name
                                                            } 
                                                        }
                                                    ], 
                                                }
                                            ],            
                                        }
                                    ],
                                }
                            ],
                            where: {
                                mobi: {
                                    [Op.like]:'%'+req.params.search+'%'
                                }
                            }      
                        });
                        res.status(200).send(schedule);
                }else if(objUser.level===2){
                        const schedule= await Schedule
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sf',
                                    include: [
                                        {
                                            model:Agency,
                                            as:'agency',
                                            include: [
                                                {
                                                    model:Datel,
                                                    as:'datel',
                                                    where: {
                                                        name: objUser.name
                                                    } 
                                                }
                                            ],            
                                        }
                                    ],
                                }
                            ],
                            where: {
                                mobi: {
                                    [Op.like]:'%'+req.params.search+'%'
                                }
                            }      
                        });
                        res.status(200).send(schedule);
                }else if(objUser.level===3){
                        const schedule= await Schedule
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sf',
                                    include: [
                                        {
                                            model:Agency,
                                            as:'agency',
                                            where: {
                                                name: objUser.name
                                            }            
                                        }
                                    ],
                                }
                            ],
                            where: {
                                mobi: {
                                    [Op.like]:'%'+req.params.search+'%'
                                }
                            }      
                        });
                        res.status(200).send(schedule);
                }
        }catch(err){
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
                const objData=await getUserEmail(req.params.token);
                const objUser=await getUserLevel(objData.email);
                if(objUser.level===1){
                   const item=await Schedule.update({
                        date:date,
                        time:time,  
                        mobi:mobi,
                        sales:sales,
                        lat:latitude,
                        lon:longitude     
                    },{
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        include: [
                                            {
                                                model:Datel,
                                                as:'datel',
                                                include: [
                                                    {
                                                        model:Witel,
                                                        as:'witel',
                                                        where:{
                                                            name:objUser.name
                                                        }
                                                    }
                                                ],
                                            }
                                        ],
                                    }
                                ]
                            }
                        ],
                        where:{
                            id:id
                        }
                    });
                    res.json(200, item);
                    return next()
                }else if(objUser.level===2){
                   const item=await Schedule.update({
                        date:date,
                        time:time,  
                        mobi:mobi,
                        sales:sales,
                        lat:latitude,
                        lon:longitude     
                    },{
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        include: [
                                            {
                                                model:Datel,
                                                as:'datel',
                                                where:{
                                                    name:objUser.name
                                                }
                                            }
                                        ],
                                    }
                                ]
                            }
                        ],
                        where:{
                            id:id
                        }
                    });
                    res.json(200, item);
                    return next()
                }else if(objUser.level===3){
                   const item=await Schedule.update({
                        date:date,
                        time:time,  
                        mobi:mobi,
                        sales:sales,
                        lat:latitude,
                        lon:longitude     
                    },{
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        where:{
                                            name:objUser.name
                                        }
                                    }
                                ]
                            }
                        ],
                        where:{
                            id:id
                        }
                    });
                    res.json(200, item);
                    return next()
                }
            }catch(err){
                return res.status(400).json({message:'cannot update!'});
            }
    }

    async delete(req, res, next) {
        const objData=await getUserEmail(req.params.token);
        const objUser=await getUserLevel(objData.email);
        try{
            if(objUser.level===1){
                const schedule = await Schedule.destroy(
                    {
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        include: [
                                            {
                                                model:Datel,
                                                as:'datel',
                                                include: [
                                                    {
                                                        model:Witel,
                                                        as:'witel',
                                                        where:{
                                                            name:objUser.name
                                                        }
                                                    }
                                                ],
                                            }
                                        ],
                                    }
                                ]
                            }
                        ],
                        where: {id: req.params.id}
                    }
                )
                if(!schedule){
                    res.status(404).json({message: 'Schedule with the given ID was not found.'})
                }
                res.status(404).json({message: 'Schedule has been deleted.'})
            }else if(objUser.level===2){
                const schedule = await Schedule.destroy(
                    {
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        include: [
                                            {
                                                model:Datel,
                                                as:'datel',
                                                where:{
                                                    name:objUser.name
                                                }
                                            }
                                        ],
                                    }
                                ]
                            }
                        ],
                        where: {id: req.params.id}
                    }
                )
                if(!schedule){
                    res.status(404).json({message: 'Schedule with the given ID was not found.'})
                }
                res.status(404).json({message: 'Schedule has been deleted.'})
            }else if(objUser.level===3){
                const schedule = await Schedule.destroy(
                    {
                        include: [
                            {
                                model:Sales,
                                as:'sf',
                                include: [
                                    {
                                        model:Agency,
                                        as:'agency',
                                        where:{
                                            name:objUser.name
                                        }
                                    }
                                ]
                            }
                        ],
                        where: {id: req.params.id}
                    }
                )
                if(!schedule){
                    res.status(404).json({message: 'Schedule with the given ID was not found.'})
                }
                res.status(404).json({message: 'Schedule has been deleted.'})
            }
        }catch(err){
            return res.status(400).json({message:'cannot delete!'});
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

getUserEmail = async (token) => {
    const data = await Token.findAll({
        limit: 1,
        where: {
            token: token
        },
        order: [ [ 'createdAt', 'DESC' ]]
    });
    const stringData=JSON.stringify(...data);
    const objData=JSON.parse(stringData);
    return objData;
}
getUserLevel = async (email) => {
    const data = await User.findAll({
        limit: 1,
        where: {
            email: email
        },
        order: [ [ 'createdAt', 'DESC' ]]
    });
    const stringData=JSON.stringify(...data);
    const objData=JSON.parse(stringData);
    return objData;
}
module.exports = new ScheduleController()