Meteor.subscribe("tournaments");
Meteor.subscribe("tournamentSubscribers");
Meteor.subscribe("userData");
Meteor.autosubscribe(function(){
  Meteor.subscribe("notifications");
});
