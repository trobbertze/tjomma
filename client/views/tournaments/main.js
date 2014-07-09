Tournaments = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var Lightbox     = require('famous.views/Lightbox');
  var Transform    = require('famous/core/Transform');
  var Easing       = require('famous/transitions/Easing');
  var Flipper      = require("famous/views/Flipper");

  // ---------------------------------------------------------------------------
  function _Tournaments(options) {
    View.apply(this, arguments);

    this.lightbox = new Lightbox({
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

    this.flipper = new Flipper();

    this.editForm = new TournamentEdit();

    var list = new TournamentList();

    this.flipper.setFront(list);
    this.flipper.setBack(this.editForm);


    var flip = function(toggle){
      var angle = toggle ? 0 : Math.PI;
      this.flipper.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
    };

    this.editForm.on("clickEdit", function(){
      flip(true);
    }.bind(this));

    list.on("clickList", function(value) {
      this.editForm.setContent(value);
      flip(false);
    }.bind(this));

    this.lightbox.show(this.flipper);

    this.add(this.lightbox);
  }
  // ---------------------------------------------------------------------------
  _Tournaments.prototype = Object.create(View.prototype);
  _Tournaments.prototype.constructor = Tournaments;
  // ---------------------------------------------------------------------------
  _Tournaments.prototype.addItem = function() {
      this.lightbox.show(this.addForm);
  };
  // ---------------------------------------------------------------------------
  _Tournaments.prototype.onAddTournamentComplete = function() {
    this.lightbox.show(this.flipper);
  };

  return new _Tournaments(options);
};
