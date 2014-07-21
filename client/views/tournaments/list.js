TournamentList = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform    = require('famous/core/Transform');
  var GenericSync  = require('famous/inputs/GenericSync');
	var MouseSync    = require('famous/inputs/MouseSync');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  require('famous/inputs/FastClick');

  TournamentList.prototype.constructor = TournamentList;

  // ---------------------------------------------------------------------------
  function _TournamentList(options) {
    View.apply(this, arguments);

    var container = new ContainerSurface();

    this.scrollview = new CursorScrollView({
      cursor: TournamentsCollection.find(),
      itemPrototype: ListItem
    });

    this.scrollview.sync = new GenericSync(['mouse', 'touch', 'scroll'], {direction: 1});
		this.scrollview._eventInput.pipe(this.scrollview.sync);
		this.scrollview.sync.pipe(this.scrollview._eventInput);

    this.scrollview.on("clickItem", this.onClick.bind(this));

    container.add(this.scrollview);

    this.add(container);

  }
  // ---------------------------------------------------------------------------
  _TournamentList.prototype = Object.create(View.prototype);
  _TournamentList.prototype.constructor = _TournamentList;
  // ---------------------------------------------------------------------------
  _TournamentList.prototype.onClick = function(document) {
    this._eventOutput.emit('clickList', document);
  };
  // ---------------------------------------------------------------------------
  return new _TournamentList(options);
};
