ParticipantItemButtons = function(options) {
  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform    = require('famous/core/Transform');
  var Utility      = require('famous/utilities/Utility');

  ParticipantItemButtons.prototype.constructor = ParticipantItemButtons;
  // ---------------------------------------------------------------------------
  function _ParticipantItemButtons(options) {
    View.apply(this, arguments);

    var buttonLayout = new SequentialLayout({
      direction: Utility.Direction.X
    });

    var challengeButton = new Surface({
      size: [40, 60],
      classes: [
        "editTournament",
        "participantItem",
        "challengeButton"
      ],
      content: "&#xf05d;",
    });

    challengeButton.on("click", this.challenge.bind(this));

    var removeButton = new Surface({
      size: [40, 60],
      classes: [
        "editTournament",
        "participantItem",
        "removeButton"
      ],
      content: "&#xf056;"
    });

    removeButton.on("click", this.remove.bind(this));

    buttonLayout.sequenceFrom([
      challengeButton,
      removeButton
    ]);

    this.buttonLayoutModifier = new StateModifier({
      origin: [1, 0.5],
      opacity: 0,
      transform: Transform.translate(80, 0, 0)
    });

    this.add(this.buttonLayoutModifier)
    .add(buttonLayout);
  }
  // ---------------------------------------------------------------------------
  _ParticipantItemButtons.prototype = Object.create(View.prototype);
  _ParticipantItemButtons.prototype.constructor = _ParticipantItemButtons;
  // ---------------------------------------------------------------------------
  _ParticipantItemButtons.prototype.show = function() {
    this.buttonLayoutModifier.setOpacity(1);
    this.buttonLayoutModifier.setTransform(
      Transform.translate(0, 0, 0),
      {
        method: 'spring',
        period: 300,
        dampingRatio: 0.3
      }
    );
  };
  // ---------------------------------------------------------------------------
  _ParticipantItemButtons.prototype.hide = function() {
    this.buttonLayoutModifier.setOpacity(0);
    this.buttonLayoutModifier.setTransform(
      Transform.translate(80, 0, 0),
      {
        method: 'spring',
        period: 300,
        dampingRatio: 0.3
      }
    );
  };
  // ---------------------------------------------------------------------------
  _ParticipantItemButtons.prototype.challenge = function() {
    this.hide();
    this._eventOutput.emit('challenge');
  };
  // ---------------------------------------------------------------------------
  _ParticipantItemButtons.prototype.remove = function() {
    this.hide();
    this._eventOutput.emit('remove');
  };
  return new _ParticipantItemButtons(options);
};
