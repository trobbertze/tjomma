TournamentEdit = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform    = require('famous/core/Transform');
  var Utility      = require('famous/utilities/Utility');
  var InputSurface = require('famous/surfaces/InputSurface');
  var GenericSync  = require('famous/inputs/GenericSync');
  var MouseSync    = require('famous/inputs/MouseSync');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  require('famous/inputs/FastClick');

  TournamentEdit.prototype.constructor = TournamentEdit;

  // ---------------------------------------------------------------------------
  function _TournamentEdit(options) {
    View.apply(this, arguments);

    var form = new SequentialLayout({
      direction: Utility.Direction.Y,
    });

    this.name = new Surface({
      size: [240, 60],
      classes: [
        "editTournament",
        "name"
      ]
    });
    this.name.on("click", this.onClick.bind(this));

    var modifier = new StateModifier({
      origin: [0, 0]
    });

    this.add(modifier).add(this.name);

    this.scrollview = new CursorScrollView();

    this.scrollview.sync = new GenericSync(['mouse', 'touch', 'scroll'], {direction: 1});
    this.scrollview._eventInput.pipe(this.scrollview.sync);
    this.scrollview.sync.pipe(this.scrollview._eventInput);

    var container = new ContainerSurface();

    container.add(this.scrollview);

    this.add(new StateModifier({
      transform: Transform.translate(0, 100, 0)
    })).add(container);

    this.addParticipantView = new AddParticipant();
    this.addParticipantView.on("addParticipant", this.addParticipantClick.bind(this));

    this.add(this.addParticipantView);

    this.progress = new ProgressIndicator();
    this.add(this.progress);

    this.alert = new AnimatedAlert();
    this.add(this.alert);

  }
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype = Object.create(View.prototype);
  _TournamentEdit.prototype.constructor = _TournamentEdit;
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype.onClick = function(evt) {
    evt.stopPropagation();
    this._eventOutput.emit('clickEdit');
  };
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype.setContent = function(document) {
    this.model = new TournamentModel(document._id);
    this.name.setContent(this.model.get('name'));

    this.scrollview.setContent(
      this.model.getParticipantsCursor(),
      ParticipantItem
    );
  };
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype.addParticipantClick = function(participantName) {
    if (this.model) {
      this.progress.show();
      this.model.addParticipant(
        participantName,
        this.addParticipantComplete.bind(this)
      );
    }
  };
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype.addParticipantComplete = function(err){
    this.progress.hide();
    if (err) {
      this.alert.show(err.reason);
    }
  };
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype.showAddParticipant = function() {
    this.addParticipantView.show();
  };

  return new _TournamentEdit(options);
};
