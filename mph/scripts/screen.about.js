mph.screens["about"] = ( function ()
{
	var game = mph.game,
    dom = mph.dom,
    $ = dom.$,
    firstRun = true;

	textOnScreen1 = "";
	textOnScreen2 = "";
	Help = "";

	function displayGameInfo()
	{
		this.textOnScreen1 = "Building Amry units requires a Military Depot."
		this.textOnScreen2 = "Colonize Other worlds and send supplies to the Capital to save humanity from defeat."
		this.Help = "Good luck figuring it all out on your own. Updates are on the way... Eventually. ---- Best played in Google Chrome.";

		$( "#about-screen .OnScreenText1 span" )[0].innerHTML =this.textOnScreen1;
		$( "#about-screen .OnScreenText2 span" )[0].innerHTML = this.textOnScreen2;
		$( "#about-screen .OnScreenText3 span" )[0].innerHTML = this.Help;
	}

	function setup() {
	    displayGameInfo();
	}

	function run() {
	    if (firstRun) {
	        setup();
	        firstRun = false;
	    }
	}

	return {
		run: run,
		textOnScreen1: textOnScreen1,
		textOnScreen2: textOnScreen2,
		Help: Help

	};
} )();