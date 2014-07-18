ChallengeItemButtons = function(options) {
  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform    = require('famous/core/Transform');
  var Utility      = require('famous/utilities/Utility');

  ChallengeItemButtons.prototype.constructor = ChallengeItemButtons;
  // ---------------------------------------------------------------------------
  function _ChallengeItemButtons(options) {
    View.apply(this, arguments);

    var buttonLayout = new SequentialLayout({
      direction: Utility.Direction.X
    });

    var acceptButton = new Surface({
      size: [40, 60],
      classes: [
        "notification",
        "challenge",
        "acceptButton"
      ],
      content: "&#xf05d;",
    });

    acceptButton.on("click", this.accept.bind(this));

    var rejectButton = new Surface({
      size: [40, 60],
      classes: [
        "notification",
        "challenge",
        "rejectButton"
      ],
      content: "&#xf056;"
    });

    rejectButton.on("click", this.reject.bind(this));

    buttonLayout.sequenceFrom([
      acceptButton,
      rejectButton
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
  _ChallengeItemButtons.prototype = Object.create(View.prototype);
  _ChallengeItemButtons.prototype.constructor = _ChallengeItemButtons;
  // ---------------------------------------------------------------------------
  _ChallengeItemButtons.prototype.show = function() {
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
  _ChallengeItemButtons.prototype.hide = function() {
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
  _ChallengeItemButtons.prototype.accept = function() {
    this.hide();
    this._eventOutput.emit('accept');
  };
  // ---------------------------------------------------------------------------
  _ChallengeItemButtons.prototype.reject = function() {
    this.hide();
    this._eventOutput.emit('reject');
  };
  return new _ChallengeItemButtons(options);
};
