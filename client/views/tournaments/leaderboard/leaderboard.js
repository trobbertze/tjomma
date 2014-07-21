Leaderboard = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var GenericSync  = require('famous/inputs/GenericSync');
  var MouseSync    = require('famous/inputs/MouseSync');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform    = require('famous/core/Transform');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _Leaderboard(options) {
    View.apply(this, arguments);

    this.scrollview = new CursorScrollView();

    this.scrollview.sync = new GenericSync(['mouse', 'touch', 'scroll'], {direction: 1});
    this.scrollview._eventInput.pipe(this.scrollview.sync);
    this.scrollview.sync.pipe(this.scrollview._eventInput);

    var container = new ContainerSurface();

    container.add(this.scrollview);

    this.add(container);
  }
  // ---------------------------------------------------------------------------
  _Leaderboard.prototype = Object.create(View.prototype);
  _Leaderboard.prototype.constructor = _Leaderboard;
  // ---------------------------------------------------------------------------
  _Leaderboard.prototype.setContent = function(cursor) {
    this.scrollview.setContent(
      cursor,
      ParticipantItem
    );

    this.scrollview.each(function(item){
      item.on("showButtons", this.clearHideParticipantItemButtons.bind(this, item));
    }, this);
  };
  // ---------------------------------------------------------------------------
  _Leaderboard.prototype.clearHideParticipantItemButtons = function(item) {
    // The buttons for "item" should not be hidden
    this.scrollview.each(function(item){
      item.hideButtons();
    }, this);
  };
  return new _Leaderboard(options);
};
