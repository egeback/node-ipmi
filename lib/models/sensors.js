var exec = require('child_process').exec;
var Sensor = require('./sensor.js');
var Basecommand = require('../basecommand.js');

String.prototype.indexOfRegex = function(regex){
  var match = this.match(regex);
  return match ? this.indexOf(match[0]) : -1;
};

var Sensors = {
    new : function () {
      var arr = [].slice.call(arguments);
      arr.__proto__ = Sensors.proto;
      return arr;
    },

    getSensors : function(options, cb) {
      var cmd = new Basecommand("ipmitool", options).makeCommand("sensor");
      exec(cmd, function callback(err, stdout, stderr) {
        var sensors = Sensors.new();
        if (err) {
            console.log("child processes failed with error code: " + err.code);
            cb(err, null);
            return;
        }
        if (stderr!=="") {
            cb(err, new Error(stderr));
            return;
        }

        var lines = stdout.split("\n");
        var i=0;
        for(i=0;i<lines[i].length;i++) {
           sensors.push(Sensor.parse(lines[i]));
        }
        cb(null, sensors);
      });
    },

    proto : {
        __proto__ : Array.prototype,

        last : function () {
            return this[this.length - 1];
        },

        max : function () {
            return Math.max.apply(null, this);
        },

        min : function () {
            return Math.min.apply(null, this);
        },

        getNames: function() {
          var names = [];
          for(i=0;i<this.length;i++) {
            fans.push(this[i].data.name);
          }
          return names;
        },

        getFans : function() {
          var i = 0;
          var fans = [];
          for(i=0;i<this.length;i++) {
            if(this[i].data.name.indexOfRegex(/.*fan.*/i)>-1)
              fans.push(this[i].data);
          }
          return fans;
        },

        getTemperatures : function() {
          var i = 0;
          var fans = [];
          for(i=0;i<this.length;i++) {
              if(this[i].data.name.indexOfRegex(/.*temp.*/i)>-1 || this[i].data.unit.indexOfRegex(/.*degree.*/)>-1)
                fans.push(this[i].data);
          }
          return fans;
        }

    }
};

module.exports = Sensors;
