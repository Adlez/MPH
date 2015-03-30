var YugiPawnchClass =	
	{
		vX: 0,
		vY: 0,
		spriteAnim: undefined,	
		
		init: function(vX, vY, animObject)	
		{
			this.vX = vX;
			this.vY = vY;
			this.spriteAnim = animObject;

		},
		
		update: function()
		{
			this.spriteAnim.x += this.vX;
			this.spriteAnim.y += this.vY;
		},
	};