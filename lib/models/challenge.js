ChallengeModel = function (id, options) {

  BaseModel.apply(this, arguments);

  if (!id) {
    this._id = ChallengesCollection.insert(options);
    this.setStatus("pending");
  }
  else {
    var cursor = ChallengesCollection.find({_id: id});
    cursor.observeChanges({
      changed: this._changed.bind(this)
    });
    cursor.forEach(function(challengeOptions){
      options = challengeOptions;
    });
  }

  this.augment(options);

};
// ---------------------------------------------------------------------------
ChallengeModel.prototype.constructor = ChallengeModel;
// ---------------------------------------------------------------------------
ChallengeModel.prototype = Object.create(BaseModel.prototype);
// ---------------------------------------------------------------------------
ChallengeModel.prototype.setStatus = function(status) {
  if (_.indexOf([
      "pending",
      "accepted",
      "rejected",
      "closed"
    ],status) > -1) {

      this.status = status;

      ChallengesCollection.update(
        {
          _id: this._id
        },
        {$set:{
          status: this.status
        }}
      );

  }
  else {
      console.error("Invalid status");
  }
};
// ---------------------------------------------------------------------------
ChallengeModel.prototype.augment = function(options){
  if (options) {
      if(_.has(options, "_id")) {
        this._id = options._id;
      }

      this.challengerId =  options.challengerId;
      var challenger = Meteor.users.findOne({
        _id: options.challengerId
      });
      this.challengerUsername = challenger.username;

      this.challengeeId =  options.challengeeId;
      var challengee = Meteor.users.findOne({
        _id: options.challengeeId
      });
      this.challengeeUsername = challengee.username;


      this.tournamentId = options.tournamentId;
      var tournament =TournamentsCollection.findOne({
        _id: options.tournamentId
      });
      this.tournamentName = tournament.name;

      this.status = options.status;
  }
};
// ---------------------------------------------------------------------------
ChallengeModel.prototype._changed = function(id, fields) {
  _.each(fields, function(value, key){
      this[key] = value;
  }, this);
  if (_.has(fields, "status")) {
      this.emit("statusChanged", fields.status);
  }
};
