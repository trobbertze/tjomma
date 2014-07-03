Meteor.startup(function () {
    var Engine = require('famous/core/Engine');

    var sideMenu = new SideMenu({
        header: {
            title: "Tjomma",
            color: '#677580',
            backgroundColor: "#aacfe5"
        },
        menu: {
            width: '200',
            buttons: [
                {
                    title: 'Home',
                    icon: '&#xf015;',
                    color: '#677580',
                    backgroundColor: "#ffffff",
                    selectedBackgroundColor: "#c3dfef",
                    action: new TestView({
                      content: "Home View",
                      backgroundColor: "blue"
                    })
                },
                {
                    title: 'My profile',
                    icon: '&#xf007;',
                    color: '#677580',
                    backgroundColor: "#ffffff",
                    selectedBackgroundColor: "#c3dfef",
                    action: new TestView({
                      content: "My Profile",
                      backgroundColor: "red"
                    })
                },
                {
                    title: 'Tournaments',
                    icon: '&#xf1e1;',
                    color: '#677580',
                    backgroundColor: "#ffffff",
                    selectedBackgroundColor: "#c3dfef",
                    action: new TestView({
                      content: "Tournaments",
                      backgroundColor: "green"
                    })
                },
                {
                    title: 'History',
                    icon: '&#xf02c;',
                    color: '#677580',
                    backgroundColor: "#ffffff",
                    selectedBackgroundColor: "#c3dfef",
                    action: new TestView({
                      content: "History",
                      backgroundColor: "yellow"
                    })
                }
            ]
        }
    });

    var mainCtx = Engine.createContext();
    mainCtx.setPerspective(1000);


    mainCtx.add(sideMenu)

})
