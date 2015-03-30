var BGanimClass =	
	{
		bg1: undefined,	
		objectLayer: undefined,	
		bg1y: 0,	
		objectLayery: 0,	
		bg1x: 0,	
		objectLayerx: 0,	
		bg1width: 1920,	
		objectLayerwidth: 1920,	
		bgSpeed: undefined,	//speed of background
		objectLayerstep: undefined,	// speed of object layer scrolling (higher is faster)
		
		init: function(image1, image2, bg1x, objectLayerx, bg1y, objectLayery, bgSpeed, objectLayerstep)
		{
			this.bg1 = image1;
			this.objectLayer = image2;
			this.bg1x = bg1x;
			this.objectLayerx = objectLayerx;
			this.bg1y = bg1y;
			this.objectLayery = objectLayery;
			this.bgSpeed = bgSpeed;
			this.objectLayerstep = objectLayerstep;
		},
		
		update: function()	
		{
			
			this.bg1x -= this.bgSpeed;	// scrolls background
			if (this.bg1x < -750)	// checks for max length, and resets if it is reached. Change this to (-)Canvas Width later.
			{
				this.bg1x = 0;
			} 

			var self = this;
			setTimeout(function(){self.update();}, 20); 
		},
		
		render: function(context)
		{
			context.drawImage(this.bg1, this.bg1x, this.bg1y);	
			context.drawImage(this.objectLayer, this.objectLayerx, this.objectLayery - this.objectLayerwidth);	// draws image a second time for "flawless" scrolling
		}
	};