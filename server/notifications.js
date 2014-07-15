Meteor.publish("notifications", function () {
  return NotificationsCollection.find({
    toUserId: this.userId
  });
});
