BaseModel = function (id, options) {
  this.events = [];
};
// ---------------------------------------------------------------------------
BaseModel.prototype.constructor = BaseModel;
// ---------------------------------------------------------------------------
BaseModel.prototype.on = function(name, callback) {
  this.events.push({
    name: name,
    callback: callback
  });
};
// ---------------------------------------------------------------------------
BaseModel.prototype.emit = function(name, obj) {
  _.each(this.events, function(evt){
    if(evt.name === name) {
    evt.callback(obj);
    }
  });
};
