TournamentModel = function (id, options) {
  if (id) {
    var document = TournamentsCollection.findOne({
      _id: id
    });
    if (document) {
      this._id = document._id;
      this.name = document.name;
      if (!document.participants) {
        this.participants = [];
      }
    }
  }
};
// ---------------------------------------------------------------------------
TournamentModel.prototype.constructor = TournamentModel;
// ---------------------------------------------------------------------------
TournamentModel.prototype.get = function(key) {
  return this[key];
};
// ---------------------------------------------------------------------------
TournamentModel.prototype.addParticipant = function(participantName, callback) {
  var participant = new TournamentParticipantModel(
    "",
    {
      tournamentId: this._id,
      participantName: participantName
    }
  );
  participant.save(callback);
};
// ---------------------------------------------------------------------------
TournamentModel.prototype.getParticipantsCursor = function() {
  return TournamentParticipantsCollection.find({
    tournamentId: this._id
  });
};
