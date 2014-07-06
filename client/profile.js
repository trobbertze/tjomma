ProfileView = function(options){
  // Famous Modules
  require("famous/core/famous");
  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var Utility      = require('famous/utilities/Utility');
  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _ProfileView(options) {
    View.apply(this);

    if (!options) {
      options = {};
    }
    if (options.logoutCallback) {
        this.logoutCallback = options.logoutCallback();
    }

    var logoutButton = new Surface({
      classes: [
        "btn",
        "btn-default",
        "logout"
      ],
      content: "Log out",
      size: [200, 40]
    });
    logoutButton.on('click', this.logout.bind(this));

    this.add(logoutButton);
  }
  // ---------------------------------------------------------------------------
  _ProfileView.prototype = Object.create(View.prototype);
  _ProfileView.prototype.constructor = _ProfileView;
  // ---------------------------------------------------------------------------
  _ProfileView.prototype.logout = function() {
    Meteor.logout(function(err){
      Events().emit("logout", {test: "test"});
    });
  };
  // ---------------------------------------------------------------------------
  return new _ProfileView(options);
};
