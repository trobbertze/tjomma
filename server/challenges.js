Meteor.publish("challenges", function () {
  return ChallengesCollection.find(
    { $or: [
      { challengeeId: this.userId},
      { challengerId: this.userId }
    ] }
  );
});
