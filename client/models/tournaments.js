TournamentModel = function() {
  if ( arguments.callee._singletonInstance ) {
    return arguments.callee._singletonInstance;
  }
  // ---------------------------------------------------------------------------
  _TournamentModel = function() {
    Meteor.subscribe("tournaments");

    // TournamentsCollection.find().observe({
    //   addedAt: this.addedAt.bind(this),
    //   changedAt: this.changedAt.bind(this),
    //   removedAt: this.removedAt.bind(this),
    //   movedTo: this.movedTo.bid(this)
    // });
    //
    // this.observers = [];

  };
  // ---------------------------------------------------------------------------
  _TournamentModel.prototype.constructor = _TournamentModel;
  // ---------------------------------------------------------------------------
  // _TournamentModel.prototype.observe = function(observer) {
  //   this.observers.push(observer);
  // };
  // ---------------------------------------------------------------------------
  // _TournamentModel.prototype.addTournament = function(options, callback) {
  //   TournamentsCollection.insert(
  //     {
  //       name: options.name
  //     },
  //     function(err, id) {
  //       callback();
  //     }
  //   );
  // };
  // // ---------------------------------------------------------------------------
  // _TournamentModel.prototype.addedAt = function(document, atIndex, before) {
  //   _.each(this.observers, function(observer){
  //     if (observer.addedAt) {
  //       observer.addedAt(document, atIndex, before)
  //     }
  //   });
  // };
  // // ---------------------------------------------------------------------------
  // _TournamentModel.prototype.changedAt = function(newDocument, oldDocument, atIndex) {
  //
  // };
  // // ---------------------------------------------------------------------------
  // _TournamentModel.prototype.removedAt = function(oldDocument, atIndex) {
  //
  // };
  // // ---------------------------------------------------------------------------
  // _TournamentModel.prototype.movedTo = function(document, fromIndex, toIndex, before) {
  //
  // };
  // ---------------------------------------------------------------------------
  arguments.callee._singletonInstance = new _TournamentModel();
};

TournamentModel();
