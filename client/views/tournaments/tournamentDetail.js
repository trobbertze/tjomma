TournamentDetail = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform    = require('famous/core/Transform');
  var Utility      = require('famous/utilities/Utility');
  var InputSurface = require('famous/surfaces/InputSurface');
  var Lightbox    = require('famous.views/Lightbox');
  var Easing      = require('famous/transitions/Easing');
  require('famous/inputs/FastClick');

  TournamentDetail.prototype.constructor = TournamentDetail;

  // ---------------------------------------------------------------------------
  function _TournamentDetail(options) {
    View.apply(this, arguments);

    var layout = new SequentialLayout({
      direction: Utility.Direction.Y
    });

    this.name = new Surface({
      size: [240, 50],
      classes: [
        "editTournament",
        "name"
      ]
    });
    this.name.on("click", this.onClick.bind(this));

    var modifier = new StateModifier({
      origin: [0, 0]
    });

    var menu = new HorizontalMenu({
      buttonWidth: 130,
      buttons: [
        {
          title: "Leaderboard",
          eventName: "leaderboard"
        },
        {
          title: "Open Challenges",
          eventName: "openChallenges"
        }
      ]
    });

    menu.on("leaderboard", this._showLeaderboard.bind(this));
    menu.on("openChallenges", this._showOpenChallenges.bind(this));

    layout.sequenceFrom([
      this.name,
      menu
    ]);

    this.add(modifier).add(layout);

    this.lightbox = new Lightbox({
      inOpacity: 1,
      outOpacity: 0,
      inTransform: Transform.translate(200, 0, 0),
      outTransform: Transform.translate(-200, 0, 1),
      inTransition: {
        method: 'spring',
        period: 300,
        dampingRatio: 0.3
      },
      outTransition: { duration: 400, curve: Easing.easeOut }
    });


    this.add(new StateModifier({
      transform: Transform.translate(0, 100, 0)
    })).add(this.lightbox);

    this.leaderboardView = new Leaderboard();
    this.openChallengesView = new OpenChallenges();

    this.addParticipantView = new AddParticipant();
    this.addParticipantView.on("addParticipant", this.addParticipantClick.bind(this));

    this.add(this.addParticipantView);

    this.progress = new ProgressIndicator();
    this.add(this.progress);

    this.alert = new AnimatedAlert();
    this.add(this.alert);

  }
  // ---------------------------------------------------------------------------
  _TournamentDetail.prototype = Object.create(View.prototype);
  _TournamentDetail.prototype.constructor = _TournamentDetail;
  // ---------------------------------------------------------------------------
  _TournamentDetail.prototype.onClick = function(evt) {
    evt.stopPropagation();
    this._eventOutput.emit('clickEdit');
  };
  // ---------------------------------------------------------------------------
  _TournamentDetail.prototype.setContent = function(document) {
    this.model = new TournamentModel(document._id);
    this.name.setContent(this.model.get('name'));

    this.leaderboardView.setContent(this.model.getParticipantsCursor());

  };

  // ---------------------------------------------------------------------------
  _TournamentDetail.prototype.addParticipantClick = function(participantName) {
    if (this.model) {
      this.progress.show();
      this.model.addParticipant(
        participantName,
        this.addParticipantComplete.bind(this)
      );
    }
  };
  // ---------------------------------------------------------------------------
  _TournamentDetail.prototype.addParticipantComplete = function(err){
    this.progress.hide();
    if (err) {
      this.alert.show(err.reason);
    }
  };
  // ---------------------------------------------------------------------------
  _TournamentDetail.prototype.showAddParticipant = function() {
    this.addParticipantView.show();
  };
  // ---------------------------------------------------------------------------
  _TournamentDetail.prototype._showLeaderboard = function() {
    this.lightbox.show(this.leaderboardView);
  };
  // ---------------------------------------------------------------------------
  _TournamentDetail.prototype._showOpenChallenges = function() {
    this.lightbox.show(this.openChallengesView);
  };
  return new _TournamentDetail(options);
};
