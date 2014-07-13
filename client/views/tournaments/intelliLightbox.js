IntelliLightbox = function(options) {

  IntelliLightbox.prototype.constructor = IntelliLightbox;

  var Lightbox     = require('famous.views/Lightbox');

  // ---------------------------------------------------------------------------
  function _IntelliLightbox(options) {
    Lightbox.apply(this, arguments);
    this.currentlyShowing = undefined;
  }
  // ---------------------------------------------------------------------------
  _IntelliLightbox.prototype = Object.create(Lightbox.prototype);
  _IntelliLightbox.prototype.constructor = _IntelliLightbox;
  // ---------------------------------------------------------------------------
  _IntelliLightbox.prototype.show_base = Lightbox.prototype.show;
  _IntelliLightbox.prototype.show = function(renderable, transition, callback) {
    this.currentlyShowing = renderable.constructor.name;
    return this.show_base(renderable, transition, callback);
  };
  return new _IntelliLightbox(options);
};
