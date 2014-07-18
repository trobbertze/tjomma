ChallengeListItem = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Utility      = require('famous/utilities/Utility');

  ChallengeListItem.prototype.constructor = ChallengeListItem;

  // ---------------------------------------------------------------------------
  function _ChallengeListItem(options) {
    View.apply(this, arguments);

    this.model = new NotificationModel(options.document._id, options.document);

    this.challengeModel = new ChallengeModel(options.document.detail.challengeId);
    this.challengeModel.on("statusChanged", this.onStatusChange.bind(this));

    var container = new ContainerSurface({
      classes: [
        "notification",
        "itemData"
      ],
      size: [undefined, 100]
    });

    var layout = new SequentialLayout({
      direction: Utility.Direction.Y,
    });

    var text = new Surface({
      size: [undefined, 60],
      classes: [
        "challenge"
      ],
      content: "<div>" + this._generateMessage() + "</div>"
    });

    text.on("click", this.onClick.bind(this));

    text.pipe(this._eventOutput);

    this.status = new Surface({
      size: [undefined, 20],
      classes: [
        "challenge"
      ],
      content: "Status: " + this.challengeModel.status
    });

    layout.sequenceFrom(
      [
        text,
        this.status
      ]
    );

    container.add(layout);

    this.buttons = new ChallengeItemButtons();

    this.buttons.on("accept", this.accept.bind(this));
    this.buttons.on("reject", this.reject.bind(this));

    container.add(this.buttons);

    this.add(container);

  }
  // ---------------------------------------------------------------------------
  _ChallengeListItem.prototype = Object.create(View.prototype);
  _ChallengeListItem.prototype.constructor = _ChallengeListItem;
  // ---------------------------------------------------------------------------
  _ChallengeListItem.prototype._generateMessage = function() {

    if (Meteor.userId() === this.challengeModel.challengerId) {
      return "You have challenged " + this.challengeModel.challengeeUsername +
        " in: " + this.challengeModel.tournamentName + ".";
    }
    else {
      return this.challengeModel.challengerUsername +
        " has challenged you in: " + this.challengeModel.tournamentName + ".";
    }

  };
  // ---------------------------------------------------------------------------
  _ChallengeListItem.prototype.onClick = function() {
    this.buttons.show();
  };
  // ---------------------------------------------------------------------------
  _ChallengeListItem.prototype.accept = function() {
    this.challengeModel.setStatus("accepted");
  };
  // ---------------------------------------------------------------------------
  _ChallengeListItem.prototype.reject = function() {
    this.challengeModel.setStatus("rejected");
  };
  // ---------------------------------------------------------------------------
  _ChallengeListItem.prototype.onStatusChange = function(status) {
    this.status.setContent("Status: " + this.challengeModel.status);
  };
  return new _ChallengeListItem(options);
};
