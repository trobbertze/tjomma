TournamentList = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');

  var GenericSync  = require('famous/inputs/GenericSync');
	var MouseSync    = require('famous/inputs/MouseSync');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  // ---------------------------------------------------------------------------
  function _TournamentList(options) {
    View.apply(this, arguments);

    this.scrollview = new CursorScrollView({
      cursor: TournamentsCollection.find(),
      itemPrototype: ListItem
    });

    this.scrollview.sync = new GenericSync(['mouse', 'touch', 'scroll'], {direction: 1});
		this.scrollview._eventInput.pipe(this.scrollview.sync);
		this.scrollview.sync.pipe(this.scrollview._eventInput);

    var container = new ContainerSurface();

    container.add(this.scrollview);

    this.add(container);

  }
  // ---------------------------------------------------------------------------
  _TournamentList.prototype = Object.create(View.prototype);
  _TournamentList.prototype.constructor = TournamentList;
  // ---------------------------------------------------------------------------
  // _TournamentList.prototype.onClick = function(value, evt) {
  //   evt.stopPropagation();
  //   this._eventOutput.emit('clickList', value);
  // };
  // ---------------------------------------------------------------------------
  return new _TournamentList(options);
};
