var Sensors = require('./models/sensors.js');

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

var defaultOptions = {privilege: 'USER'};

function Connect(hostname, username, password, options) {
  hostname = typeof hostname !== 'undefined' || hostname === null ? hostname : {};
  password = typeof password !== 'undefined' || password === null ? password : {};
  username = typeof username !== 'undefined' || username === null ? username : {};
  options = typeof options !== 'undefined' || options === null ? options : {};

  //Combine defaultOptions with options
  options = extend({}, defaultOptions, options);

  this.cmdOptions = {};
  this.hostname = hostname;
  this.username = username;
  this.password = password;
  this.options = options;

  if(typeof options.privilege !== 'undefined') {
    this.cmdOptions.L = options.privilege;
  }

  if(hostname!==null)
    this.cmdOptions.H = hostname;
  if(username!==null)
    this.cmdOptions.U = username;
  if(password!==null)
    this.cmdOptions.P = password;

  //TODO: Test connection

  //Default set to null
  this.sensors = null;

}

Connect.prototype.getSensors = function(cb, refreshdata) {
  refreshdata = typeof refreshdata !== 'undefined' || refreshdata === null ? refreshdata : false;
  var self = this;
  var callback = function(err, sensors) {
    if(err)
      cb(err, null);

    self.sensors = sensors;
    cb(null, sensors);
  };

  if(this.sensors!==null && !refreshdata) {
    console.log("reuse");
    cb(null, this.sensors);
  }

  Sensors.getSensors(this.cmdOptions, callback);
};

module.exports = Connect;
