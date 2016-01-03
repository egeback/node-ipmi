var Foo = function(s) {
  s = typeof s !== 'undefined' ? s : "testar";
  console.log(s);

};
Foo.prototype.bar = function() { console.log("bar"); };

Foo.prototype.getData = function() {
  console.log("hej");
};

Foo.create = function() {
  return new Foo();
};

module.exports = Foo;

//var f = new Foo();
//f.bar();
