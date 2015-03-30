var WorldClass =
	{
		h_WorldType: 0,
		h_WorldHasRuins: false,
		h_WorldFertilityLevel: 0, //1:20%, 2:50%,3:20%,4:10%
		h_WorldMineralLevel: 0, //1:45%, 2:25%, 3:25%, 4:5%
		h_WorldHasRuins: false, //false:80%, true:20%
		h_DistanceFromMainColony: 0.0,
		h_DistanceFromCapital: 0.0,
		h_WorldHasColony: false,

		x: 0,
		y: 0,
		vX: 0,
		vY: 0,
		spriteAnim: undefined,
		width: undefined,
		height: undefined,

		init: function ( x, y, vX, vY, spriteAnim, width, height, worldType, hasRuins, fLevel, mLevel,
			distanceFromMainColony, distanceFromCapital, hasColony )
		{
			this.x = x;
			this.y = y;
			this.vX = vX;
			this.vY = vY;
			this.spriteAnim = spriteAnim;
			this.width = width;
			this.height = height;
			this.h_WorldType = worldType;
			this.h_WorldHasRuins = hasRuins;
			this.h_WorldFertilityLevel = fLevel;
			this.h_WorldMineralLevel = mLevel;
			this.h_DistanceFromMainColony = distanceFromMainColony;
			this.h_DistanceFromCapital = distanceFromCapital;
			this.h_WorldHasColony = hasColony;

			if(this.h_WorldType == 3)
			{
				this.h_WorldFertilityLevel = 0;
				this.h_WorldMineralLevel += 2;
			}
			if(this.h_WorldType == 1)
			{
				this.h_WorldFertilityLevel += 1;
			}
		},



	//	MainColonyWorld : WorldClass;
	};