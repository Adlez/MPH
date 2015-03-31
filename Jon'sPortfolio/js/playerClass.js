var PlayerClass =
	{
		x: 0,
		y: 0,
		vX: 0,
		vY: 0,
		yugiInitalXPos: 50,
		yugiAnnoyance: 0,
		yugiDepressed: 0,
		yugiBored: 100,
		yugiGravity: 5,
		JUMP_FORCE: 20,
		initialJumpForce : 350,
		curSpriteAnim: undefined,	// the currently active player animation
		regSpriteAnim: undefined,	// player  normal animation
		sadSpriteAnim: undefined,	// player loss 1 animation
		madSpriteAnim: undefined,	// player loss 2 animation
		yugiBlasts: undefined,
		grounded: true,
		wolvesDefeated: 0,
		
		
		init: function(x, y, vX, vY, normAnimObject, pBlasts)	// initializes a new player object
		{
			this.x = x;
			this.y = y;
			this.vX = vX;
			this.vY = vY;
			this.regSpriteAnim = normAnimObject;
			this.yugiBlasts = pBlasts;
			
		},

		jump: function(player)
		{
			//console.log("Yugi is grounded: " + player.grounded);
			if (player.grounded == true)
			{
				this.vY -= player.initialJumpForce;
				//this.vX += 30;
				player.grounded = false;
			}
			if (player.grounded == false)
			{
				//this.vY -= player.JUMP_FORCE;
				//this.grounded = false;
			}
			
		},
		  
		fall: function(canvas, player)
		{
			//console.log("Yugi is grounded: " + player.grounded);
		
		},
		
		update: function (canvas, player)
		{
			this.curSpriteAnim.x += this.vX;
			this.curSpriteAnim.y += this.vY;
			this.regSpriteAnim.x = this.curSpriteAnim.x;
			this.regSpriteAnim.y = this.curSpriteAnim.y;

			//console.log("yugi's current pos: " + player.curSpriteAnim.x)

			if (player.grounded == false)
			{
				this.vY = 0;
				this.vY += player.yugiGravity;
				this.vX = 4;
				
				//this.vX = player.yugiGravity;

				if (player.curSpriteAnim.y >= canvas.height - 157)
				{
					//console.log("Yugi's height: " + player.curSpriteAnim.y);
					
					player.grounded = true;
					this.vY = 0;

					if (this.curSpriteAnim.x > this.yugiInitialPos)
					{
				//		this.vX += 5;
					}
				}
				if(player.grounded == true)
				{
					this.vX = -5;
				}
			}
			//console.log(this.yugiInitalXPos + "," + this.curSpriteAnim.x);

			if(this.yugiInitalXPos > this.curSpriteAnim.x)
			{
				//this.vX = 0;
				this.curSpriteAnim.x = this.yugiInitalXPos;

			}
			//}

			if (player.grounded == true)
			{
				if (this.yugiInitialPos > player.curSpriteAnim.x)
				{
					//this.vX = 0;
					player.curSpriteAnim = this.yugiInitialPos;
				}
			}
		},
			
	};