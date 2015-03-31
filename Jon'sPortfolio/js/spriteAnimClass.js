var SpriteAnimClass = 	// this is the sprite animation class
	{
		spriteSheet: undefined,
		x: 0,
		y: 0,
		numFrames: 0,
		startFrame: 0,
		endFrame: 0,
		curFrame: 0,
		frameHeight: undefined,
		frameWidth: undefined,
		frameRate: undefined,
		
		init : function(image, x, y, numFrames, startFrame, endFrame, curFrame, frameWidth, frameHeight, frameRate) // initializes a new SpriteAnimClass object
		{
			this.spriteSheet = image;
			this.x = x;
			this.y = y;
			this.numFrames = numFrames;
			this.startFrame = startFrame;
			this.endFrame = endFrame;
			this.curFrame = curFrame;
			this.frameWidth = frameWidth;
			this.frameHeight = frameHeight;
			this.frameRate = frameRate;
		},
		
		update: function()	// the animate function to animate each object 
		{
			if(this.curFrame >= this.numFrames || this.curFrame >= this.endFrame)
			{
				this.curFrame = this.startFrame;
			}
			else
			{
				this.curFrame++;
			}
			var self = this;
			setTimeout(function(){self.update();}, self.frameRate);
		},
		
		render: function(context)
		{
			context.drawImage(this.spriteSheet, this.curFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight,
								this.x, this.y, this.frameWidth, this.frameHeight);
		}
	};