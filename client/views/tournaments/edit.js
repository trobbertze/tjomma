TournamentEdit = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');

  // ---------------------------------------------------------------------------
  function _TournamentEdit(options) {
    View.apply(this, arguments);

    this.surface = new Surface({
      size: [undefined, undefined]
    });

    this.surface.on("click", this.onClick.bind(this));

    this.add(this.surface);

  }
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype = Object.create(View.prototype);
  _TournamentEdit.prototype.constructor = TournamentEdit;
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype.onClick = function(evt) {
    evt.stopPropagation();
    this._eventOutput.emit('clickEdit');
  };
  // ---------------------------------------------------------------------------
  _TournamentEdit.prototype.setContent = function(content) {
    this.surface.setContent(content);
  };
  // ---------------------------------------------------------------------------
  return new _TournamentEdit(options);
};
