Meteor.startup(function () { 
    var Engine = require('famous/core/Engine');

    var sideMenu = new SideMenu({
    	header: {
    		title: "Tjomma"
    	}
    });

    var mainCtx = Engine.createContext();
    mainCtx.setPerspective(1000);

    
    mainCtx.add(sideMenu)

})