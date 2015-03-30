var WorldClass =
	{
		


		h_WorldFertilityLevel: 0,
		h_WorldMinerlaLevel: 0,
		h_WorldHasRuins: false,
		x: 0,
		y: 0,
		vX: 0,
		vY: 0,
		spriteAnim: undefined,
		width: undefined,
		height: undefined,

		init: function ( x, y, vX, vY, spriteAnim, width, height )
		{
			this.x = x;
			this.y = y;
			this.vX = vX;
			this.vY = vY;
			this.spriteAnim = spriteAnim;
			this.width = width;
			this.height = height;
		},

	//	MainColonyWorld : WorldClass;
	};