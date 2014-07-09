Meteor.startup(function () {
  var Engine      = require('famous/core/Engine');
  var Lightbox    = require('famous.views/Lightbox');
  var Transform   = require('famous/core/Transform');
  var Utility     = require('famous/utilities/Utility');
  var Easing      = require('famous/transitions/Easing');

  var mainCtx = Engine.createContext();
  mainCtx.setPerspective(1000);

  var lightbox = new Lightbox({
    inOpacity: 1,
    outOpacity: 0,
    inTransform: Transform.translate(0, 320, 0),
    outTransform: Transform.translate(0, -320, 1),
    inTransition: { duration: 400, curve: Easing.outBack },
    outTransition: { duration: 400, curve: Easing.easeOut }
  });

  mainCtx.add(lightbox);

  var onLogout = function() {
    lightbox.show(login);
  };

  var app = startApp(onLogout);

  if(Meteor.user()) {
    lightbox.show(app);
  }
  else {
    var login = new FamousLogin();
    lightbox.show(login);
  }

  Events().on("logout", function(obj){
    lightbox.show(login);
  });

  Events().on("login", function(obj){
    lightbox.show(app);
  });
});
