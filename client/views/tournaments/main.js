Tournaments = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var Transform    = require('famous/core/Transform');
  var Easing       = require('famous/transitions/Easing');
  var Flipper      = require("famous/views/Flipper");
  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _Tournaments(options) {
    View.apply(this, arguments);

    this.lightbox = new IntelliLightbox({
      inOpacity: 1,
      outOpacity: 0,
      inTransform: Transform.translate(0, -320, 0),
      outTransform: Transform.translate(0, 320, 1),
      inTransition: { duration: 400, curve: Easing.outBack },
      outTransition: { duration: 400, curve: Easing.easeOut }
    });

    this.addForm = new TournamentAdd();
    this.addForm.on(
      "addTournamentComplete",
      this.onAddTournamentComplete.bind(this)
    );

    this.addForm.on(
      "backButtonClicked",
      this.onAddTournamentComplete.bind(this)
    );

    this.flipper = new Flipper();

    this.editForm = new TournamentDetail();

    var list = new TournamentList();

    this.flipper.setFront(list);
    this.flipper.setBack(this.editForm);

    this.editForm.on("clickEdit", function(){
      //flip(true);
      this.flipper.flip();
    }.bind(this));

    list.on("clickList", function(value) {
      this.editForm.setContent(value);
      this.flipper.flip();
    }.bind(this));

    this.lightbox.show(this.flipper);

    this.add(this.lightbox);
  }
  // ---------------------------------------------------------------------------
  _Tournaments.prototype = Object.create(View.prototype);
  _Tournaments.prototype.constructor = _Tournaments;
  // ---------------------------------------------------------------------------
  _Tournaments.prototype.addItem = function() {
    // If tournament Edit is showing
    if (this.lightbox.currentlyShowing &&
      this.lightbox.currentlyShowing === "Flipper" &&
      this.flipper.flipped === true){
          this.editForm.showAddParticipant();
    }
    else {
      this.lightbox.show(this.addForm);
    }
  };
  // ---------------------------------------------------------------------------
  _Tournaments.prototype.onAddTournamentComplete = function() {
    this.lightbox.show(this.flipper);
  };

  return new _Tournaments(options);
};
