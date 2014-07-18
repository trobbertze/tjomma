NotificationModel = function (id, options) {

  if(!id) {
    NotificationsCollection.insert(options);
  }

  this.augment(options);
};
// ---------------------------------------------------------------------------
NotificationModel.prototype.constructor = NotificationModel;
// ---------------------------------------------------------------------------
NotificationModel.prototype.augment = function(options){
  this._id = options._id;

  this.fromUserId =  options.fromUserId;
  var fromUser = Meteor.users.findOne({
    _id: options.fromUserId
  });
  this.fromUserName = fromUser.username;

  this.toUserId =  options.toUserId;
  var toUser = Meteor.users.findOne({
    _id: options.toUserId
  });
  this.toUserName = toUser.username;
};
