
/*------------------------------------------------------------------------------------------------------------------
IMPORTANT: This file has been modified with an additional "world" property. If you don't want an object to move within the level it's "world" property should be set to {x:0, y:0}. Typically the player's world is {x:0, y:0}, while everything in the level will use the level object as it's world.
--------------------------------------------------------------------------------------------------------------------*/

function GameObject(obj)
{	
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.start = {x:this.x, y:this.y};
		this.width = 100;
		this.height = 100;
		
		this.color = "#ff0000";
		this.force = 1;
		this.ax = 1;
		this.ay = 1;
		this.vx = 0;
		this.vy = 0;
		this.world = {x:0, y:0};
		this.img=new Image();
		this.data;
		this.dir = 1;
		var ready=false;


function fixCanvasDPI(canvas, ctx) {
  // get CSS size (use getBoundingClientRect to get actual on-screen size)
  const rect = canvas.getBoundingClientRect();
  const cssWidth = rect.width || canvas.clientWidth || canvas.width;
  const cssHeight = rect.height || canvas.clientHeight || canvas.height;

  // device pixel ratio
  const dpr = window.devicePixelRatio || 1;

  // set style to the CSS size (ensures canvas element stays that size on page)
  canvas.style.width = cssWidth + 'px';
  canvas.style.height = cssHeight + 'px';

  // set internal pixel buffer to CSS size * DPR
  canvas.width = Math.round(cssWidth * dpr);
  canvas.height = Math.round(cssHeight * dpr);

  // reset any previous transforms and scale the drawing context so 1 unit = 1 CSS pixel
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}





		Object.defineProperty(this, `hitBoxWidth`, {
			get : function () {return this._hitBoxWidth},
			set : function (_value) {this._hitBoxWidth = _value}
		})

		Object.defineProperty(this, `hitBoxHeight`, {
			get : function () {return this._hitBoxHeight},
			set : function (_value) {this._hitBoxHeight = _value}
		})
		//console.log(this.hitBoxWidth)
		//this.hitBoxWidth=400
		//console.log(`words ${this.hitBoxWidth}`)		

		this.setHitBox =  function(obj)
		{
			this.hitboxWidth = obj.width;
			this.hitBoxHeight = obj.height;
			return this;
		}
		
		this.img.addEventListener(`load`, function(e){
			ready=true
		})

		this.colColor = ``;
		this.fin=true;
		
		
		//the angle that the graphic is drawn facing.
		this.angle = 0;
		this.currentState =`idle`
		this.currentFrame = 0;
		this.spriteData;
		this.counter;
		
		//------Allows us to pass object literals into the class to define its properties--------//
		//------This eliminate the need to pass in the property arguments in a specific order------------//
		if(obj!== undefined)
		{
			for(value in obj)
			{
				if(this[value]!== undefined)
				this[value] = obj[value];
			}
		}
	

	this._hitBoxWidth = this.width
	this._hitBoxHeight = this.height
	//whether or not the object can jump
	this.canJump = false;
	this.jumpHeight = -30;
	
	this.collisionPoints = {
		top:{x:0,y: -this.hitBoxHeight/2},
		right:{x:this.hitBoxWidth/2,y:0},
		bottom:{x:0,y:this.hitBoxHeight/2},
		left:{x:-this.hitBoxWidth/2,y:0}
	}

	

 	console.log(this.collisionPoints)

	for(let i in this.collisionPoints)
	{
		Object.defineProperty(this, i, {
			get : function () {return {x:this.x+this.collisionPoints[i].x, y:this.y + this.collisionPoints[i].y, world:this.world}},
			set : function (_value) {this.collisionPoints[i] = _value}
		})
	}
	
	
	this.makeSprite = function(data)
		{
			//console.log(data)
			this.spriteData = data
			this.img.src = this.spriteData.info.src;
			//console.log(this.currentState)
			this.counter = this.spriteData.states[this.currentState].fps;
			return this;
		};

	this.changeState=function(_newState)
	{
		if(this.currentState!=_newState && this.fin)
		{
			this.currentState = _newState
			//this.counter=0;
			this.currentFrame=0
			//console.log("booyeah")
			if(this.spriteData.states[this.currentState].cycle==false)
			{
				this.fin=false;
			}
		}	
		return this;
	}

		

	this.play=function(_func=function(){return})
	{
		
		
		if(this.counter<0)
		{
			this.currentFrame++;
			if(this.currentFrame > this.spriteData.states[this.currentState].frames.length-1)
			{
				this.currentFrame = (this.spriteData.states[this.currentState].cycle)? 0 : this.spriteData.states[this.currentState].frames.length-1;
			}
			this.counter = this.spriteData.states[this.currentState].fps;
		}
		if(this.currentFrame==this.spriteData.states[this.currentState].frames.length-1 && this.spriteData.states[this.currentState].cycle==false)
		{
			this.fin=true
			_func()
		}
		
		this.counter--;
		return this;
	}

	this.drawStaticImage = function(_args = {}) {
  // default draw area (centered)
  let _data = {
    x: -this.width/2,
    y: -this.height/2,
    w: this.width,
    h: this.height
  };

  for (let k in _args) if (_args[k] !== undefined) _data[k] = _args[k];

  if (!ready) return this;

  context.save();
  context.translate(this.x + this.world.x, this.y + this.world.y);

  // static images (backgrounds) should not be flipped by dir unless explicitly desired
  // If you want flip for static images, set a flag and apply scale here.
  context.rotate(this.angle * Math.PI/180);

  // disable smoothing if requested globally in spriteData.info
  if (this.spriteData && this.spriteData.info && this.spriteData.info.no_antialiasing) {
    context.imageSmoothingEnabled = false;
  }

  // draw image at translated position using destination width/height
  context.drawImage(this.img, _data.x, _data.y, _data.w, _data.h);

  context.restore();
  return this;
}


this.drawSprite = function(){
    if (!ready || !this.spriteData) return this;

    let frame = this.spriteData.states[this.currentState].frames[this.currentFrame];

    // source rect from spritesheet
    let sx = frame.startX;
    let sy = frame.startY;
    let sw = frame.width;
    let sh = frame.height;

    context.save();

    // move to object position
    context.translate(this.x + this.world.x, this.y + this.world.y);

    // --- FACING DIRECTION ---
    // base flip from dir
    let flip = (this.dir === -1);

    // if spritesheet is authored facing the opposite way, use info.flip_x to invert
    if (this.spriteData.info && this.spriteData.info.flip_x) {
        flip = !flip;
    }

    if (flip) {
        context.scale(-1, 1);
    }

    // rotate if needed
    context.rotate(this.angle * Math.PI/180);

    // smoothing
    if (this.spriteData.info && this.spriteData.info.no_antialiasing) {
        context.imageSmoothingEnabled = false;
    } else {
        context.imageSmoothingEnabled = true;
    }

    // --- SCALE TO FIT RECTANGLE WITHOUT SQUISHING ---
    let scaleX = this.width  / sw;
    let scaleY = this.height / sh;

    // slightly bigger: boost the scale a bit
    let scale = Math.min(scaleX, scaleY) * 1.1; // tweak 1.2 → 1.1 or 1.3 if you want

    let drawW = sw * scale;
    let drawH = sh * scale;

    // center the sprite
    let dx = -drawW / 2;
    let dy = -drawH / 2;

    context.drawImage(
        this.img,
        sx, sy, sw, sh,
        dx, dy, drawW, drawH
    );

    context.restore();
    return this;
}




	this.drawMask = function(_color)
	{
		context.save();
		
			context.fillStyle = _color;
			
			context.translate(this.x + this.world.x, this.y + this.world.y);
			context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
		context.restore();
		return this;
		
	}	

	this.drawRect = function(_args={})
	{

		let _data ={}
		_data.x =-this.width/2;//reg x
		_data.y =-this.height/2;//reg y
		_data.w = this.width//image width
		_data.h = this.height//image height

		for(let i in _args)
		{
			if(_args[i] !== undefined)
			{
			_data[i]=_args[i]

			}
		}

		context.save();
			context.fillStyle = this.color;
			context.translate(this.x + this.world.x, this.y + this.world.y);
			context.rotate(this.angle * Math.PI/180);
			context.translate(_data.x, _data.y)
			context.fillRect(0, 0, _data.w, _data.h);
		context.restore();
		
	}	
	
	this.drawCircle = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.beginPath();
			context.translate(this.x + this.world.x, this.y + this.world.y);
			context.arc(0, 0, this.radius(), 0, 360 *Math.PI/180, true);
			context.closePath();
			context.fill();
		context.restore();
		
	}	
	
	//draws a triangle
	this.drawTriangle = function()
	{
		context.fillStyle = this.color;
		context.translate(this.x + this.world.x, this.y + this.world.y);
		context.rotate(this.angle * Math.PI/180);
			context.beginPath();
				context.moveTo(0+ this.width/2, 0);
				context.lineTo(0 - this.width/2, 0 - this.height/2);
				context.lineTo(0 - this.width/2, 0 + this.height/2);
				context.closePath();
			context.fill();
		context.restore();
		
	}	

	this.render= function(_func=`drawRect`, _args=undefined)
	{
		this[_func](_args);
		return this;
	}

	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}

	
	//---------Returns object's for the top, bottom, left and right of an object's bounding box.
	/*this.left = function() 
	{
		return {x:this.x - this._hitBoxWidth/2 - 1 , y:this.y, world:this.world}
	}
	this.right = function() 
	{
		return {x:this.x + this._hitBoxWidth/2 + 1 , y:this.y, world:this.world}
	}
	
	this.top = function() 
	{
		return {x:this.x, y:this.y - this._hitBoxHeight/2 - 1, world:this.world}
	}
	/*this.bottom = function() 
	{
		return {x:this.x , y:this.y + this._hitBoxHeight/2 + 1, world:this.world}
	}*/
	
	this.overlap= function(obj)
	{
		if(obj.constructor.name ===`GameObject`)
		{
		   if(this.left.x + this.world.x <= obj.right.x + obj.world.x && 
		   this.right.x + this.world.x >= obj.left.x + obj.world.x &&
		   this.top.y + this.world.y <= obj.bottom.y + obj.world.y &&
		   this.bottom.y + this.world.y >= obj.top.y + obj.world.y)
			{
				return true
			}
		}
		else
		{
			if(obj.x + obj.world.x >= this.left.x + this.world.x && 
		   obj.x + obj.world.x <= this.right.x + this.world.x &&
		   obj.y + obj.world.y >= this.top.y + this.world.y &&  
		   obj.y + obj.world.y <= this.bottom.y + this.world.y)
		{
			return true;
		}
	}
		
		return false;
	}

	this.overlapShape = function(obj)
	{
		if(this.leftx + this.world.x <= obj.right.x + obj.world.x && 
		   this.right.x + this.world.x >= obj.left.x + obj.world.x &&
		   this.top.y + this.world.y <= obj.bottom.y + obj.world.y &&
		   this.bottom.y + this.world.y >= obj.top.y + obj.world.y)
		{
			return true
		}
		return false;
	}
		
	//------Tests whether a single point overlaps the bounding box of another object-------
	this.overlapPoint = function(obj)
	{
		if(obj.x + obj.world.x >= this.left.x + this.world.x && 
		   obj.x + obj.world.x <= this.right.x + this.world.x &&
		   obj.y + obj.world.y >= this.top.y + this.world.y &&  
		   obj.y + obj.world.y <= this.bottom.y + this.world.y)
		{
			return true;
		}
		return false;
	}
	
	/*-----Sets or gets the radius value--------*/
	this.radius = function(newRadius)
	{
		 if(newRadius==undefined)
		 {
			return this.width/2; 
		 }
		 else
		 {
			 return newRadius;
		 }
	}
	
	//Draws the collision points
	this.drawDebug = function()
	{
		var size = 5;
		context.save();
		context.fillStyle = "black";
		context.fillRect(this.left().x-size/2, this.left().y-size/2, size, size);
		context.fillRect(this.right().x-size/2, this.right().y-size/2, size, size);
		context.fillRect(this.top().x-size/2, this.top().y-size/2, size, size);
		context.fillRect(this.bottom().x-size/2, this.bottom().y-size/2, size, size);
		context.fillRect(this.x-size/2, this.y-size/2, size, size);
		context.restore();
	}
}
