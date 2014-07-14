ParticipantItem = function(options) {
  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  var Utility      = require('famous/utilities/Utility');

  ParticipantItem.prototype.constructor = ParticipantItem;
  // ---------------------------------------------------------------------------
  function _ParticipantItem(options) {
    View.apply(this, arguments);

    this.document = options.document;

    var model = new TournamentParticipantModel(
      null,
      {
        participantId: this.document.participantId
      }
    );

    var container = new ContainerSurface({
      size: [undefined, 100]
    });

    var surface = new Surface({
      size: [undefined, 100],
      content: "<div class='itemData'>" + model.get("participantName") + "</div>",
      properties: {
      }
    });

    surface.on("click", this.onClick.bind(this));

    surface.pipe(this._eventOutput);

    this.buttons = new ParticipantItemButtons();

    container.add(surface);

    container.add(this.buttons);

    this.add(container);

  }
  // ---------------------------------------------------------------------------
  _ParticipantItem.prototype = Object.create(View.prototype);
  _ParticipantItem.prototype.constructor = _ParticipantItem;
  // ---------------------------------------------------------------------------
  _ParticipantItem.prototype.onClick = function(evt) {
    this.showButtons();
  };
  // ---------------------------------------------------------------------------
  _ParticipantItem.prototype.showButtons = function() {
    this._eventOutput.emit('showButtons');
    this.buttons.show();
  };
  // ---------------------------------------------------------------------------
  _ParticipantItem.prototype.hideButtons = function() {
    this.buttons.hide();
  };
  return new _ParticipantItem(options);
};
