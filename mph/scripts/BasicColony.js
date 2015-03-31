var BasicColonyObject =
	{
		h_ColonyWorldHasRuins: false,
		h_ColonyMaxDockedShips: 0,
		h_ColonyCurDockedShips: 0,
		h_ColonyStoredFood: 0,
		h_ColonyOutputFood: 0,
		h_ColonyStoredMaterial: 0,
		h_ColonyOutputMaterial: 0,
		h_ColonyOutputScience: 0,
		h_ColonyLevel: 0,
		h_ColonyMaxDefence: 0,
		h_ColonyCurDefense: 0,
		h_ColonyMaxHP: 0,
		h_ColonyCurHP: 0,
		h_OddsOfInvasion: 0.0,

		init: function ( worldHasRuins, maximumShips, curShips, storedFood, storedMaterial, colonyLevel,
			colonyDefense, colonyHP, invasionChance )
		{
			this.h_ColonyWorldHasRuins = worldHasRuins;
			this.h_ColonyMaxDockedShips = maximumShips;
			this.h_ColonyCurDockedShips = curShips;
			this.h_ColonyStoredFood = storedFood;
			this.h_ColonyStoredMaterial = storedMaterial;
			this.h_ColonyLevel = colonyLevel;
		},

	};