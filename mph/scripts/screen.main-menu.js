mph.screens["main-menu"] = (function() {
    var dom = mph.dom,
        game = mph.game,
        $ = dom.$,
        firstRun = true;
        textOnScreen1 = "";
        textOnScreen2 = "";
        Help = "";

    function displayGameInfo() {
        this.textOnScreen1 = "Building Amry units requires a Military Depot."
        this.textOnScreen2 = "Colonize Other worlds and send supplies to the Capital to save humanity from defeat."
        this.Help = "Good luck figuring it all out on your own. Updates are on the way... Eventually. ---- Best played in Google Chrome.";

        //$("#main-menu .OnScreenText1 span")[0].innerHTML = this.textOnScreen1;
        //$("#main-menu .OnScreenText2 span")[0].innerHTML = this.textOnScreen2;
        //$("#main-menu .OnScreenText3 span")[0].innerHTML = this.Help;
    }

    function setup() {
        dom.bind("#main-menu ul.menu", "click", function(e) {
            if (e.target.nodeName.toLowerCase() === "button") {
                var action = e.target.getAttribute("name");
                game.showScreen(action);
            }
        });

        displayGameInfo();
    }

    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
    }

    return {
        run : run
    };
})();
