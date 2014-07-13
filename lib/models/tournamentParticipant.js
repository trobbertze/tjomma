TournamentParticipantModel = function (id, options) {
  if (id) {
    options = TournamentParticipantsCollection.findOne({
      _id: id
    });
  }
  if (options) {
    this._id = options._id ? options._id : undefined;
    this.tournamentId = options.tournamentId ? options.tournamentId : undefined;
    this.participantId = options.participantId ? options.participantId : undefined;
    this.participantName = options.participantName ? options.participantName : undefined;
    this.tournamentName = options.tournamentName ? options.tournamentName : undefined;

    this.augment();
  }
};
// ---------------------------------------------------------------------------
TournamentParticipantModel.prototype.constructor = TournamentParticipantModel;
TournamentParticipantModel.prototype = Object.create(null);
// ---------------------------------------------------------------------------
TournamentParticipantModel.prototype.get = function(key) {
  return this[key];
};
// ---------------------------------------------------------------------------
TournamentParticipantModel.prototype.save = function(callback) {
  TournamentParticipantsCollection.update(
    this._id,
    {
      tournamentId: this.tournamentId,
      participantId:this.participantId
    },
    {
      multi: false,
      upsert: true
    },
    callback
  );
};
// ---------------------------------------------------------------------------
TournamentParticipantModel.prototype.augment = function() {
  var query;
  if (this.participantId) {
    query = {
      _id: this.participantId
    };
  }
  else {
    query = {
      username: this.participantName
    };
  }
  var user = Meteor.users.findOne(query);
  if (user) {
    this.participantName = user.username;
    this.participantId = user._id;
  }

  if (this.tournamentId) {
    query = {
      tournamentId: this.tournamentId
    };
  }
  else {
    query = {
      name: this.tournamentName
    };
  }
  var tournament =TournamentsCollection.findOne({
    _id: this.tournamentId
  });
  if (tournament) {
    this.tournamentId = tournament._id;
    this.tournamentName = tournament.name;
  }
};
