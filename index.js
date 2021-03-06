var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();

var config = fs.readFileSync('config.json','utf8');
config = JSON.parse(config);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  
  if (req.method == 'OPTIONS') {
    return res.send(200);
  }
  next();
});

app.all('*',function(req, res) {
  request({
    url: config.HOST + req.url,
    headers: {'Authorization': 'Bearer ' + config.ACCESS_KEY},
    json: true
  }, function(error, response, body) {
    if(!error) {
      res.json(body);
    }
  });
});

app.listen(config.PORT);
console.log('Listening to port ' + config.PORT)
