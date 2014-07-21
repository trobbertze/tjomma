ListItem = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');

  // ---------------------------------------------------------------------------
  function _ListItem(options) {
    View.apply(this, arguments);

    this.document = options.document;

    var surface = new Surface({
      size: [undefined, 50],
      content: "<div class='itemData'>" + this.document.name + "</div>",
      properties: {
      }
    });

    surface.pipe(this._eventOutput);

    this.add(surface);

  }
  // ---------------------------------------------------------------------------
  _ListItem.prototype = Object.create(View.prototype);
  _ListItem.prototype.constructor = _ListItem;

  // ---------------------------------------------------------------------------
  return new _ListItem(options);
};
