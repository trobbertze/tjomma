AddParticipant = function(options) {

  var View         = require('famous/core/View');
  var Surface      = require('famous/core/Surface');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform    = require('famous/core/Transform');
  var Utility      = require('famous/utilities/Utility');
  var InputSurface = require('famous/surfaces/InputSurface');

  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  require('famous/inputs/FastClick');

  AddParticipant.prototype.constructor = AddParticipant;

  // ---------------------------------------------------------------------------
  function _AddParticipant(options) {
    View.apply(this, arguments);

    var addParticipantLayout = new SequentialLayout({
      direction: Utility.Direction.X,
    });

    this.addParticipantName = new InputSurface({
      size: [200, 60],
      classes: [
        "editTournament",
        "addParticipantName"
      ],
      placeholder: "Add a friend",
      properties: {
        zIndex: 1000
      },
      type: 'text'
    });

    var addParticipantButton = new Surface({
      classes: [
        "editTournament",
        "addButton"
      ],
      content: "&#xf055;",
      properties: {
        zIndex: 1000
      },
      size: [40, 60]
    });

    addParticipantButton.on("click", this.onaddParticipantButtonClick.bind(this));

    addParticipantLayout.sequenceFrom([
      this.addParticipantName,
      addParticipantButton
    ]);

    var container = new ContainerSurface({
      size: [undefined, 120],
      classes: [
        "editTournament",
        "addParticipant",
        "container"
      ]
    });

    container.add(
      new StateModifier({
        origin: [0.5, 0.5]
      })
    ).add(addParticipantLayout);

    this.stateModifier = new StateModifier({
      origin: [0,0],
      transform: Transform.translate(0, -120, 0),
      opacity: 0
    });

    this.add(this.stateModifier).add(container);
  }
  // ---------------------------------------------------------------------------
  _AddParticipant.prototype = Object.create(View.prototype);
  _AddParticipant.prototype.constructor = _AddParticipant;
  // ---------------------------------------------------------------------------
  _AddParticipant.prototype.onaddParticipantButtonClick = function() {
    this._eventOutput.emit('addParticipant', this.addParticipantName.getValue());
    this.hide();
  };
  // ---------------------------------------------------------------------------
  _AddParticipant.prototype.show = function() {
    this.stateModifier.setOpacity(1);
    this.stateModifier.setTransform(
      Transform.translate(0, 0, 1),
      {
        method: 'spring',
        period: 300,
        dampingRatio: 0.3
      }
    );
  };
  // ---------------------------------------------------------------------------
  _AddParticipant.prototype.hide = function() {
    this.stateModifier.setTransform(
      Transform.translate(0, -120, 0),
      {
        method: 'spring',
        period: 300,
        dampingRatio: 0.3
      },
      function() {
          this.stateModifier.setOpacity(0);
      }.bind(this)
    );

  };
  return new _AddParticipant(options);
};
