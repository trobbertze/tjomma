Meteor.publish("tournaments", function () {
  return TournamentsCollection.find(); 
});
