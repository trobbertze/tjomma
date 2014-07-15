Notifications = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var Transform    = require('famous/core/Transform');
  var Easing       = require('famous/transitions/Easing');
  var Flipper      = require("famous/views/Flipper");
  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _Notifications(options) {
    View.apply(this, arguments);

    this.lightbox = new IntelliLightbox({
      inOpacity: 1,
      outOpacity: 0,
      inTransform: Transform.translate(0, -320, 0),
      outTransform: Transform.translate(0, 320, 1),
      inTransition: { duration: 400, curve: Easing.outBack },
      outTransition: { duration: 400, curve: Easing.easeOut }
    });

    this.flipper = new Flipper();

    var list = new NotificationsList();

    this.flipper.setFront(list);
    //this.flipper.setBack(this.editForm);


    this.lightbox.show(this.flipper);

    this.add(this.lightbox);
  }
  // ---------------------------------------------------------------------------
  _Notifications.prototype = Object.create(View.prototype);
  _Notifications.prototype.constructor = _Notifications;

  return new _Notifications(options);
};
