Meteor.publish("tournaments", function () {
  return TournamentsCollection.find();
});

Meteor.publish("tournamentSubscribers", function () {
  return TournamentParticipantsCollection.find();
});
