var Connect = require('./lib/node-ipmi.js');
var exec = require('child_process').exec;

var server1 = new Connect("hostname", "username", "password");

var d = new Date();
var n = d.getTime();

//Sensors.getSensors(function(err, sensors) {
server1.getSensors(function(err, sensors) {
  var d1 = new Date();
  var n1 = d1.getTime();
  console.log("done. took: " + (n1-n)/1000 + "s");
  d = new Date();
  n = d.getTime();
  console.log("Fans");
  //console.log(sensors.getFans());
  console.log("Temp");
  d1 = new Date();
  n1 = d1.getTime();
  console.log(sensors.getTemperatures());
  console.log("done. took: " + (n1-n)/1000 + "s");
});
