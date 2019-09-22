// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
var db=require('./config/index.js');
const UserController = require('./controller/userController');
const DistributionController = require('./controller/distributionController');
const ScheduleController = require('./controller/scheduleController');
const ModelController = require('./controller/modelController');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require('passport');
require('./config/passport')(passport);
require('dotenv').config()

// defining the Express app
const app = express();
app.use(session({
  store: new RedisStore({
	url: `redis://localhost`
  }),
  secret: 'my-strong-secret',
  resave: false,
  port:process.env.PORT,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];
// adding Helmet to enhance your API's security
app.use(helmet());
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));
// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});
//adding public folder as static url
app.use(express.static('public'));
/*=================================>user api<================================*/
app.get('/api/v1/user',passport.authenticate('jwt', { session: false}),UserController.index);
app.post('/api/v1/user',UserController.create);
app.post('/api/v1/signin',UserController.signin);
app.get('/api/v1/check/:token',UserController.check);
app.delete('/api/v1/logout/:token',UserController.logout);
/*===============================>schedule api<==============================*/
//show schedule available with current date
app.get('/api/v1/schedule/:token',ScheduleController.index);
//show schedule available with page and limit
app.get('/api/v1/schedule/:page/:limit/:token',ScheduleController.pagination);
app.get('/api/v1/schedule/:search/:token',ScheduleController.search);
//create schedule
app.post('/api/v1/schedule/:token',ScheduleController.create);
app.put('/api/v1/schedule/:id/:token',ScheduleController.update);
app.delete('/api/v1/schedule/:id/:token',ScheduleController.delete);
/*==============================>distribution api<===========================*/
app.post('/api/v1/regional',DistributionController.createRegional);
app.post('/api/v1/witel',DistributionController.createWitel);
app.post('/api/v1/datel',DistributionController.createDatel);
app.post('/api/v1/agency',DistributionController.createAgency);
app.post('/api/v1/sales',DistributionController.createSales);
app.post('/api/v1/apc',DistributionController.createAPC);
app.post('/api/v1/odp',DistributionController.createODP);
app.post('/api/v1/poly',DistributionController.createPOLY);
app.post('/api/v1/mobi',DistributionController.createMobi);
app.get('/api/v1/distribution/:token',DistributionController.index);
app.get('/api/v1/distribution/:id',DistributionController.detail);
//show searching odp and apc like in params
app.get('/api/v1/distribution/:odp/:apc/:token',DistributionController.search);
//show optimization using k-mean clustering
app.get('/api/v1/optimization/:token',DistributionController.optimization);
app.get('/api/v1/mobi/:token',DistributionController.showMobi);


// app.get('/api/v1/model/:date',ModelController.index);
// app.post('/api/v1/model',ModelController.create);

// starting the server
app.listen(process.env.PORT, function () {
  console.log('your url :'+process.env.HOSTNAME+process.env.PORT);
});
