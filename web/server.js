//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
   promise  = require('request-promise'),
    eps     = require('ejs'),
    morgan  = require('morgan'); //,
    // parse application/json
    var bodyParser = require('body-parser')
    var server = require('http').createServer(app);

    var io = require('socket.io')(server);

    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

const util = require('util');

Object.assign=require('object-assign');

app.engine('html', require('ejs').renderFile);
//app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8181,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL ,
    datapipelineAPI = process.env.DATAPIPELINE_CAMEL_URL || process.env.OPENSHIFT_DATAPIPELINE_CAMEL_URL || "http://localhost:8080",
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = mongoServiceName,
      mongoPort = "27017",
      mongoDatabase = process.env.MONGODB_DATABASE,
      mongoPassword = process.env.MONGODB_PASSWORD,
      mongoUser = process.env.MONGODB_USER;

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}
var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
  if (mongoURL == null) return;

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

app.post('/orderService', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
   console.log("sending json to /orderService");
   console.log(util.inspect(req.body, {showHidden: false, depth: null}));

  if (!db) {
    console.log("db error");
    initDb(function(err){});
  }
  if (db) {
    	var col = db.collection('orders');

	// Create a document with request IP and current time of request

	col.insert({ productName: req.body.productName, productPrice: req.body.productPrice, productCategory: req.body.productCategory, productQuantity: req.body.productQuantity });

	// sending orders to data analytics pipeline
	var options = {
        method: 'POST',
        uri: datapipelineAPI + '/order/create',
        json: true,
        body: { productName: req.body.productName, productPrice: parseFloat(req.body.productPrice), productCategory: parseInt(req.body.productCategory), productQuantity: parseInt(req.body.productQuantity) }
    };

    promise(options)
        .then(function(json) {

            console.log(json);
            res.send(json);
        }).catch(function(err) {
            console.log(err);
            res.send(err);
        });
	res.send('{ orderstatus : success }');

  } else {
    res.render('index.html', { pageCountMessage : null});
  }
});


app.get('/orderService', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    db.collection('orders').find().toArray(function(err, results) {
  console.log(results);
console.log(err);
  res.send(results);
  // send HTML file populated with quotes here
  });

  } else {
    res.send('{ }');
  }
});

app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){
      res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
    });
  } else {
    res.render('index.html', { pageCountMessage : null});
  }
});

app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    db.collection('counts').count(function(err, count ){
      res.send('{ pageCount: ' + count + '}');
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});


// Setting up websockets:

io.on('connection', function(client){
  console.log('a user connected');
client.emit('greeting', {'message': 'hello world'});

  client.on('sendtobackend', function(data) {

       console.log("sendtobackend"+data);
       client.emit('messages', data);
   });


});


server.listen(4200);

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
