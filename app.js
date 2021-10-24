const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var Eureka = require('eureka-js-client').Eureka;


// Connect Database
connectDB();
// Logger
app.use(logger('dev'));
app.use(bodyParser.json({limit: "52428800"}));
app.use(bodyParser.urlencoded({limit: "52428800", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(express.json({ extended: false }));
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1;

//Euroka configuration
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '192.168.99.100');
const eurekaPort = (process.env.EUREKA_SERVER_PORT || 8081);
const hostName = (process.env.HOSTNAME || 'localhost')
const ipAddr = '192.168.99.100';
//routes
const Livraison = require('./routes/LivraisonAPI');
var client = new Eureka({
    instance: {
      app: 'Livraison-service',
      hostName: hostName,
      ipAddr: ipAddr,
      port: {
        '$': 3000,
        '@enabled': true,
      },
      vipAddress: 'jq.test.something.com',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      }  
    },
    eureka: {
        host: eurekaHost,
        port: eurekaPort,
        servicePath: '/eureka/apps/',
        maxRetries: 10,
        requestRetryDelay: 2000,
      }
    });

    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.json({message: "Hello World!"});
});

app.use('/livraison', Livraison);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

