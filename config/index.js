'use strict'
var config=require('./config.js');
const Sequelize = require('sequelize');

module.exports={
	name: 'rest-api',
	hostname: 'http://localhost',
	version: '0.0.1',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8888,
	uri:new Sequelize(`${config.development.database}`, `${config.development.username}`, `${config.development.password}`, {
	  host: `${config.development.host}`,
	  dialect: 'mysql'
	})
}