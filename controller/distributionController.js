const Regional = require('./../db/models').RegionalMaster;
const Witel = require('./../db/models').WitelMaster;
const Datel = require('./../db/models').DatelMaster;
const Agency = require('./../db/models').AgencyMaster;
const Sales = require('./../db/models').SalesMaster;
const Token = require('./../db/models').Token;
const User = require('./../db/models').User;
const Mobi = require('./../db/models').MobiMaster;
const APCDistribution = require('./../db/models').APCDistribution;
const ODPDistribution = require('./../db/models').ODPDistribution;
const PolyCoordinate = require('./../db/models').PolyCoordinate;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const odp = require(`./../seeders/odp`);
const apc = require(`./../seeders/apc`);
const poly = require(`./../seeders/poly`);
const agency_sedeer = require(`./../seeders/agency`);
const witel_sedeer = require(`./../seeders/witel`);
const datel_sedeer = require(`./../seeders/datel`);
const sales_sedeer = require(`./../seeders/sales`);
const mobi_sedeer = require(`./../seeders/mobimaster`);
require('../config/passport')(passport);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class DistributionController {
    async index(req, res, next) {
        try{
            const email=await getUserEmail(req.params.token);
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
                    email: email
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
    async createRegional(req, res, next) {
        try{
            const regional = await Regional.create(req.body)
            res.status(201).send(regional)
            return next()
        }catch(err){
            return next(err)
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
    async createWitel(req, res, next) {
        try{
            const witel = await Witel.bulkCreate(witel_sedeer)
            res.status(201).send(witel)
            return next()
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async createDatel(req, res, next) {
        try{
            const datel = await Datel.bulkCreate(datel_sedeer)
            res.status(201).send(datel)
            return next()
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async createAgency(req, res, next) {
        try{
            const agency = await Agency.bulkCreate(agency_sedeer)
            res.status(201).send(agency)
            return next()
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async createSales(req, res, next) {
        try{
            const sales = await Sales.bulkCreate(sales_sedeer)
            res.status(201).send(sales)
            return next()
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async createMobi(req, res, next) {
        try{
            const mobi = await Mobi.bulkCreate(mobi_sedeer)
            res.status(201).send(mobi)
            return next()
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async showMobi(req, res, next) {
        try{
            const objData=await getUserEmail(req.params.token);
            const objUser=await getUserLevel(objData.email);
            if(objUser.level===1){
                const mobi = await Mobi.findAll({
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
                    ]                        
                })
                res.status(201).send(mobi)
                return next()
            }else if(objUser.level===2){

            }else if(objUser.level===3){

            }
        }catch(err){
            return res.status(400).json({message:'please chech your fields!'});
        }
    }
    async optimization(req, res, next){
            try{
                const objData=await getUserEmail(req.params.token);
                const objUser=await getUserLevel(objData.email);
                if(objUser.level===1){
                        const distribution= await ODPDistribution
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sales',
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
                        });
                        const string=JSON.stringify(distribution);
                        const obj=JSON.parse(string);
                        let vectors = new Array();
                        for (let i = 0 ; i < obj.length ; i++) {
                          vectors[i] = [ obj[i]['lat'] , obj[i]['lon'], obj[i]['status_occ']];
                        }
                        const kmeans = require('node-kmeans');
                        kmeans.clusterize(vectors, {k: (distribution.length)/8}, (err,result) => {
                          if (err) console.error(err);
                          else res.status(201).send(result);
                        });
                }else if(objUser.level===2){
                        const distribution= await ODPDistribution
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sales',
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
                        });
                        const string=JSON.stringify(distribution);
                        const obj=JSON.parse(string);
                        let vectors = new Array();
                        for (let i = 0 ; i < distribution.length ; i++) {
                          vectors[i] = [ obj[i]['lat'] , obj[i]['lon'], obj[i]['status_occ']];
                        }
                        const kmeans = require('node-kmeans');
                        kmeans.clusterize(vectors, {k: (user.length)/8}, (err,result) => {
                          if (err) console.error(err);
                          else res.status(201).send(result);
                        });
                }else if(objUser.level===3){
                        const distribution= await ODPDistribution
                        .findAll({
                            include: [
                                {
                                    model:Sales,
                                    as:'sales',
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
                        });
                        const string=JSON.stringify(distribution);
                        const obj=JSON.parse(string);
                        let vectors = new Array();
                        for (let i = 0 ; i < distribution.length ; i++) {
                          vectors[i] = [ obj[i]['lat'] , obj[i]['lon'], obj[i]['status_occ']];
                        }
                        const kmeans = require('node-kmeans');
                        kmeans.clusterize(vectors, {k: (user.length)/8}, (err,result) => {
                          if (err) console.error(err);
                          else res.status(201).send(result);
                        });
                }
        }catch(err){
            return next(err)
        }
    }
    async search(req, res, next){
        let odp=req.params.odp || null;
        let apc=req.params.apc || null;
            try{
                const objData=await getUserEmail(req.params.token);
                const objUser=await getUserLevel(objData.email);
                if(objUser.level===1){
                        const distribution= await Sales
                        .findAll({
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
                                },
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
                                },

                            ]       
                        });
                        const string=JSON.stringify(distribution);
                        const obj=JSON.parse(string);
                        res.status(200).send(obj);
                }else if(objUser.level===2){
                        const distribution= await Sales
                        .findAll({
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
                                },
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
                                },

                            ]       
                        });
                        const string=JSON.stringify(distribution);
                        const obj=JSON.parse(string);
                        res.status(200).send(obj);
                }else if(objUser.level===3){
                        const distribution= await Sales
                        .findAll({
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
                                },
                                {
                                    model:Agency,
                                    as:'agency',
                                    where: {
                                        name: objUser.name
                                    }  
                                },

                            ]       
                        });
                        const string=JSON.stringify(distribution);
                        const obj=JSON.parse(string);
                        res.status(200).send(obj);
                }
        }catch(err){
            return next(err)
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
module.exports = new DistributionController()