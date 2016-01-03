var fields = ["name", "value", "unit", "status", "type", "state", "lower_nonrec",
              "lower_crit", "lower_noncrit", "upper_crit", "upper_nonrec", "asserts_enabled", "deasserts_enabled"  ];
var type = ["string", "number", "string", "string", "number", "number", "number", "number", "number", "number"];

function Sensor(data) {
  data = typeof data !== 'undefined' ? data : null;
  this.data = data;
}

Sensor.prototype.setData = function(data) {
  this.data = data;
};

Sensor.prototype.getData = function() {
  return this.data;
};

Sensor.parse = function(line) {
  var data = {};
  var parts = line.split('|');
  var i = 0;
  for(i=0;i<parts.length;i++) {
   if(type[i] == "number")
     data[fields[i]] = Number(parts[i].trim());
   else
     data[fields[i]] = parts[i].trim();
  }

  var sensor = new Sensor(data);
  //sensors.setData(data);
  return sensor;
};

module.exports = Sensor;
