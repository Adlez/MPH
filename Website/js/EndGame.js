function checkForEnd(yugiAnnoyance, yugiDepressed, context, canvas, player, GameOver)
{
	function gameOverMadEnd()
	{
		//console.log("Too angry. You lose.");
		GameOver = true;

		function gameOver()
		{
			//throw new Error('The mayor is too angry to continue. Game Over.');
		}

		gameOver();
	}

	function gameOverSadEnd()
	{
		//console.log("Too sad.");
		GameOver = true;

		function gameOver()
		{
			//throw new Error('The mayor is too sad to continue. Game Over.');
		}

		gameOver();
	}

	if (yugiAnnoyance >= 25)
	{
		gameOverMadEnd();
	}

	if (yugiDepressed >= 1)
	{
		gameOverSadEnd();
	}
}