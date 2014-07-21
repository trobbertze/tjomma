OpenChallenges = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _OpenChallenges(options) {
    View.apply(this, arguments);

    var surface = new Surface({
      size: [100, 100],
      content: "OpenChallenges"
    });

    this.add(surface);
  }
  // ---------------------------------------------------------------------------
  _OpenChallenges.prototype = Object.create(View.prototype);
  _OpenChallenges.prototype.constructor = _OpenChallenges;
  // ---------------------------------------------------------------------------

  return new _OpenChallenges(options);
};
