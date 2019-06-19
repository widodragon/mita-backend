const Model = require('./../db/models').Model;
const Vehicle = require('./../db/models').Vehicle;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const data = require('./../seeders/mobidum');
require('../config/passport')(passport);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ModelController {
    async index(req, res, next) {
        try{
            const model= await Model.findAll({
              include: [{
                model: Vehicle,
                as:'vehicle',
                where: {
                  date:req.params.date
                }
              }],
            })
            res.json({model:model});
        }catch(err){
            console.log(err)
        }
    }
    async create(req, res, next) {
        try{
            const model = await Model.create(req.body)
            res.send(200, model)
            return next()
        }catch(err){
            return res.json({message:'please chech your fields!'});
        }
    }

    async search(req, res, next){
        try{
            if(req.params.search!=''){
               const vehicle = await Vehicle.findAll({
                  where: {
                    mobi: {
                        [Op.like]:'%'+req.params.search+'%'
                    }
                  }
                })
               res.json(200, vehicle)
            }
        }catch(e){
            // return res.json({message:'please chech your fields!'});
            next(e);
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
module.exports = new ModelController()