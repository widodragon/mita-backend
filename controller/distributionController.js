const Distribution = require('./../db/models').Witel;
const Token = require('./../db/models').Token;
const User = require('./../db/models').User;
const APCDistribution = require('./../db/models').APCDistribution;
const ODPDistribution = require('./../db/models').ODPDistribution;
const PolyCoordinate = require('./../db/models').PolyCoordinate;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const odp = require(`./../seeders/odp`);
const apc = require(`./../seeders/apc`);
const poly = require(`./../seeders/poly`);
require('../config/passport')(passport);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class DistributionController {
    async index(req, res, next) {
        const token =req.params.token
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
                        model:Distribution,
                        as:'distribution',
                        include: [
                            {
                                model:ODPDistribution,
                                as:'odp'
                            },
                            {
                                model:APCDistribution,
                                as:'apc'
                            }
                        ]
                    }
                ],
                where: {
                    email: objData.email
                }          
            });
            const string=JSON.stringify(...user);
            const obj=JSON.parse(string);
            res.status(200).send(obj.distribution);
        }catch(err){
            return next(err)
        }
    }
    async detail(req, res, next) {
        let id=req.params.id
        try{
            const user= await User
            .findAll({
                include: [
                    {
                        model:Distribution,
                        as:'distribution',
                        include: [
                            {
                                model:ODPDistribution,
                                as:'odp',
                                where: {
                                    id:id
                                }
                            }
                        ]
                    }
                ]          
            });
            const string=JSON.stringify(...user);
            const obj=JSON.parse(string);
            // const distribution= await Distribution.findAll({
            //     where: {
            //         id:id
            //     }
            // })
            res.status(200).send(obj.distribution);
        }catch(err){
            return res.status(404).json({message:'cannot access to resource'});
        }
    }
    async createAPC(req, res, next) {
        try{
            const distribution = await APCDistribution.bulkCreate(apc)
            res.status(201).send(distribution)
            return next()
        }catch(err){
            return next(err)
        }
    }
    async createODP(req, res, next) {
        try{
            const distribution = await ODPDistribution.bulkCreate(odp)
            res.status(201).send(distribution)
            return next()
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async createPOLY(req, res, next) {
        try{
            const distribution = await PolyCoordinate.bulkCreate(poly)
            res.status(201).send(distribution)
            return next()
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async create(req, res, next) {
        try{
            const distribution = await Distribution.create(req.body)
            res.status(201).send(distribution)
            return next()
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async optimization(req, res, next){
        const token = req.params.token
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
                        model:Distribution,
                        as:'distribution',
                        include: [
                            {
                                model:ODPDistribution,
                                as:'odp'
                            }
                        ]
                    }
                ],
                where: {
                    email: objData.email
                }           
            });
            const string=JSON.stringify(...user);
            const obj=JSON.parse(string);
            const masterODP=obj.distribution.odp;
            let vectors = new Array();
            for (let i = 0 ; i < masterODP.length ; i++) {
              vectors[i] = [ masterODP[i]['lat'] , masterODP[i]['lon'], masterODP[i]['status_occ']];
            }
            const kmeans = require('node-kmeans');
            kmeans.clusterize(vectors, {k: masterODP.length/8}, (err,result) => {
              if (err) console.error(err);
              else res.status(201).send(result);
            });
            return next()
        }catch(err){
            return res.status(400).json({message:'result is empty!'});
        }
    }
    async search(req, res, next){
        let odp=req.params.odp || null;
        let apc=req.params.apc || null;
        const token =req.params.token;
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
                        model:Distribution,
                        as:'distribution',
                        include: [
                            {
                                model:ODPDistribution,
                                as:'odp',
                                limit:100,
                                where:{
                                    name:
                                    {
                                        [Op.like]:'%'+odp+'%'
                                    }
                                }
                            },
                            {
                                model:APCDistribution,
                                as:'apc',
                                limit:100,
                                where:{
                                    nama_segment:
                                    {
                                        [Op.like]:'%'+apc+'%'
                                    }
                                },
                                include: ['polygon']
                            }
                        ]      
                    }
                ],
                where: {
                    email: objData.email
                }           
            });
            const string=JSON.stringify(...user);
            const obj=JSON.parse(string);
            res.status(200).send(obj.distribution)
        }catch(e){
            return res.status(400).json({message:'result is empty!'});
        }
    }

    // async update(req, res, next) {
    //     const id=req.params.id;
    //     const {mobi,sales,latitude,longitude,date}=req.body;
    //     try{
    //        const item=await Vehicle.update({
    //             mobi:mobi,
    //             sales:sales,
    //             latitude:latitude,
    //             longitude:longitude,
    //             date:date       
    //         },{
    //             where:{
    //                 id:id
    //             }
    //         });
    //         res.json(200, item);
    //         return next()
    //     }catch(e){
    //         next(e);
    //     }
    // }

    // async delete(req, res, next) {
    //     try{
    //         const vehicle = await Vehicle.destroy(
    //             {
    //                 where: {id: req.params.id}
    //             }
    //         )
    //         if(!vehicle){
    //             res.send(500, {message: 'Vehicle with the given ID was not found.'})
    //         }
    //         res.send(200, {message: 'Vehicle has been deleted.'})
    //         return next()
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
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
module.exports = new DistributionController()