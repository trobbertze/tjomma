startApp = function() {
    return new SideMenu({
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
                    action: new BaseView({
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
                    action: new ProfileView()
                },
                {
                    title: 'Tournaments',
                    icon: '&#xf1e1;',
                    color: '#677580',
                    backgroundColor: "#ffffff",
                    selectedBackgroundColor: "#c3dfef",
                    action: new BaseView({
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
                    action: new BaseView({
                      content: "History",
                      backgroundColor: "yellow"
                    })
                }
            ]
        }
    });
};
