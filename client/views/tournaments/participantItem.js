ParticipantItem = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');

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

    var surface = new Surface({
      size: [undefined, 100],
      content: "<div class='itemData'>" + model.get("participantName") + "</div>",
      properties: {
      }
    });

    surface.pipe(this._eventOutput);

    this.add(surface);

  }
  // ---------------------------------------------------------------------------
  _ParticipantItem.prototype = Object.create(View.prototype);
  _ParticipantItem.prototype.constructor = _ParticipantItem;

  // ---------------------------------------------------------------------------
  return new _ParticipantItem(options);
};
