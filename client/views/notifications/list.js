NotificationsList = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var GenericSync  = require('famous/inputs/GenericSync');
  var MouseSync    = require('famous/inputs/MouseSync');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  require('famous/inputs/FastClick');

  NotificationsList.prototype.constructor = NotificationsList;

  // ---------------------------------------------------------------------------
  function _NotificationsList(options) {
    View.apply(this, arguments);

    this.scrollview = new CursorScrollView({
      cursor: NotificationsCollection.find(),
      itemPrototype: NotificationListItem
    });

    this.scrollview.sync = new GenericSync(['mouse', 'touch', 'scroll'], {direction: 1});
    this.scrollview._eventInput.pipe(this.scrollview.sync);
    this.scrollview.sync.pipe(this.scrollview._eventInput);

    this.scrollview.on("clickItem", this.onClick.bind(this));

    var container = new ContainerSurface();

    container.add(this.scrollview);

    this.add(container);

  }
  // ---------------------------------------------------------------------------
  _NotificationsList.prototype = Object.create(View.prototype);
  _NotificationsList.prototype.constructor = _NotificationsList;
  // ---------------------------------------------------------------------------
  _NotificationsList.prototype.onClick = function(document) {
    this._eventOutput.emit('clickList', document);
  };
  // ---------------------------------------------------------------------------
  return new _NotificationsList(options);
};
