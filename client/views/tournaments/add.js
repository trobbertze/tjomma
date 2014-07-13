TournamentAdd = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform    = require('famous/core/Transform');
  var InputSurface = require('famous/surfaces/InputSurface');
  var Utility      = require('famous/utilities/Utility');

  TournamentAdd.prototype.constructor = TournamentAdd;

  // ---------------------------------------------------------------------------
  function _TournamentAdd(options) {
    View.apply(this, arguments);

    var form = new SequentialLayout({
      direction: Utility.Direction.Y,
    });

    this.name = new InputSurface({
      size: [240, 60],
      classes: [
        "addTournament",
        "name"
      ],
      placeholder: "Enter a name for a new tournament",
      type: 'text'
    });

    var addButton = new Surface({
      classes: [
        "addTournament",
        "addButton"
      ],
      content: "&#xf055;",
      size: [240, 80]
    });

    addButton.on("click", this.onAddButtonClick.bind(this));

    var backButton = new Surface({
      classes: [
        "addTournament",
        "backButton"
      ],
      content: "&#xf0a8;",
      size: [240, 80]
    });

    backButton.on("click", this.onBackButtonClick.bind(this));

    form.sequenceFrom([
      this.name,
      addButton,
      backButton
      ]);

    var modifier = new StateModifier({
      origin: [0.5, 0],
      transform: Transform.translate(0, 50, 0)
    });


    this.add(modifier).add(form);

    this.progress = new ProgressIndicator();
    this.add(this.progress);

    this.alert = new AnimatedAlert();
    this.add(this.alert);
  }
  // ---------------------------------------------------------------------------
  _TournamentAdd.prototype = Object.create(View.prototype);
  _TournamentAdd.prototype.constructor = _TournamentAdd;
  // ---------------------------------------------------------------------------
  _TournamentAdd.prototype.onAddButtonClick = function(evt) {
    this.progress.show();
    TournamentsCollection.insert(
      {
        name: this.name.getValue()
      },
      this.addTournamentComplete.bind(this)
      );
  };
  // ---------------------------------------------------------------------------
  _TournamentAdd.prototype.onBackButtonClick = function(evt) {
    this._eventOutput.emit('backButtonClicked');
  };
  // ---------------------------------------------------------------------------
  _TournamentAdd.prototype.addTournamentComplete = function(err, id){
    this.progress.hide();
    this._eventOutput.emit('addTournamentComplete', id);
  };
  // ---------------------------------------------------------------------------
  return new _TournamentAdd(options);
};
