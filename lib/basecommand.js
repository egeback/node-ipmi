function Basecommand(commandname, opts) {
  this.cmdname = commandname;
  this.options = opts;

  this.result = null;
}

Basecommand.prototype.makeCommand = function(command) {
  var args = '';
  // need to format the options to ipmitool format
  for (var variable in this.options) {
    args += " -" + variable + " " + this.options[variable];
  }

  // since ipmitool requires commands to be in specific order
  args += ' ' + command;

  return this.cmdname + " " + args.trim();
};

Basecommand.prototype.setOptions = function (options) {
  this.options = options;
};

module.exports = Basecommand;
