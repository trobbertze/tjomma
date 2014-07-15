NotificationListItem = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');

  // ---------------------------------------------------------------------------
  function _NotificationListItem(options) {
    View.apply(this, arguments);

    this.model = new NotificationModel(options.document._id, options.document);

    var surface = new Surface({
      size: [undefined, 100],
      content: "<div class='itemData'>From: " + this.model.fromUserName + "; " + this.model.topic + "</div>",
      properties: {
      }
    });

    surface.pipe(this._eventOutput);

    this.add(surface);

  }
  // ---------------------------------------------------------------------------
  _NotificationListItem.prototype = Object.create(View.prototype);
  _NotificationListItem.prototype.constructor = _NotificationListItem;

  // ---------------------------------------------------------------------------
  return new _NotificationListItem(options);
};
