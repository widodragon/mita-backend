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

// defining the Express app
const app = express();
app.use(session({
  store: new RedisStore({
	url: `redis://localhost`
  }),
  secret: 'my-strong-secret',
  resave: false,
  port:db.port,
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
app.get('/api/v1/user',passport.authenticate('jwt', { session: false}),UserController.index);
app.post('/api/v1/user',UserController.create);
app.post('/api/v1/signin',UserController.signin);
app.get('/api/v1/check/:token',UserController.check);
app.delete('/api/v1/logout/:token',UserController.logout);

app.get('/api/v1/schedule/:token',ScheduleController.index);
app.get('/api/v1/schedule/:page/:limit/:token',ScheduleController.pagination);
app.get('/api/v1/schedule/:search/:token',ScheduleController.search);
app.post('/api/v1/schedule',ScheduleController.create);
app.put('/api/v1/schedule/:id',ScheduleController.update);
app.delete('/api/v1/schedule/:id',ScheduleController.delete);

app.post('/api/v1/witel',DistributionController.create);
app.post('/api/v1/apc',DistributionController.createAPC);
app.post('/api/v1/odp',DistributionController.createODP);
app.post('/api/v1/poly',DistributionController.createPOLY);
app.get('/api/v1/distribution/:token',DistributionController.index);
app.get('/api/v1/distribution/:id',DistributionController.detail);
app.get('/api/v1/distribution/:odp/:apc/:token',DistributionController.search);
app.get('/api/v1/optimization/:token',DistributionController.optimization);


// app.get('/api/v1/model/:date',ModelController.index);
// app.post('/api/v1/model',ModelController.create);

// starting the server
app.listen(db.port, function () {
  console.log('your url :'+db.hostname+'/'+db.port);
});

