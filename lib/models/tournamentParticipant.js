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
TournamentParticipantModel.prototype.remove = function() {
  TournamentParticipantsCollection.remove({_id: this._id});
};
// ---------------------------------------------------------------------------
TournamentParticipantModel.prototype.challenge = function(options, callback) {

  var challenge = new ChallengeModel(
    null,
    {
      challengerId: options.fromUserId,
      challengeeId: this.participantId,
      tournamentId: this.tournamentId
    },
    function(err) {
      if (callback) {
        callback(err);
      }
    }
  );

  if (challenge._id) {
    //Send a notification to the challengee
    new NotificationModel(
      null,
      {
        fromUserId: options.fromUserId,
        toUserId: this.participantId,
        type: "challenge",
        detail: {
            challengeId: challenge._id
        }
      },
      function(err) {
        if (callback) {
          callback(err);
        }
      }
    );

    //Send a notification to the challenger
    new NotificationModel(
      null,
      {
        fromUserId: this.participantId,
        toUserId: options.fromUserId,
        type: "challenge",
        detail: {
            challengeId: challenge._id
        }
      },
      function(err) {
        if (callback) {
          callback(err);
        }
      }
    );
  }

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
      _id: this.tournamentId
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
