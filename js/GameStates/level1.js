var attackSound = new Audio("sounds/blast.mp3");
attackSound.volume = 1.0; 

var jumpSound = new Audio("sounds/jump.mp3");
jumpSound.volume = 1.0;
jumpSound.preload = "auto";
jumpSound.load();

var bgMusic = new Audio("sounds/background.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;


/*------------Use this if you want to implement States---------------*/
var gravity = 1;
var friction = {x:.85,y:.97}

var stage = new GameObject({width:canvas.width, height:canvas.height});

//A level object when it is moved other objects move with it.
var level = new GameObject({x:0,y:0});


//Avatar
var wiz = new GameObject({
    width:142,        // was 128
    height:142,       // was 128 
    spriteData:playerData
}).makeSprite(playerData)

// Ground before the cave (FIX)
var ground = new GameObject({
    width: 1024,         
    x: 1024 / 2,            // should start before the cave
    height: 64,
    y: canvas.height - 32,
    world: level
});
ground.img.src = `images/ground.png`;


// //ground2 overlay
// var caveFloorOverlay = new GameObject({
//     width: canvas.width * 10,
//     height: 64,
//     x: 1024 + (canvas.width * 10) / 2,
//     y: canvas.height - 32,
//     world: level
// });
// caveFloorOverlay.img.src = "images/ground2.png";

//The ground
// var ground = new GameObject({width:canvas.width*10, x:canvas.width*10/2-200,height:64,y:canvas.height-32, color:"green", world:level})
// ground.img.src=`images/ground.png`

// var ground2 = new GameObject({
//     width: 600,
//     height: 64,
//     x: 2000,
//     y: canvas.height - 32,
//     world: level
// });
// ground2.img.src = `images/ground2.png`;

// // Decorative ground strip starting at cave entrance (x = 1024)
// var ground2 = new GameObject({
//     width: 64 * 10,                 // 10 tiles wide; tweak as needed
//     height: 64,
//     x: 1024 + (64 * 10) / 2,        // centered over that span
//     y: canvas.height - 32,
//     world: level
// });
// ground2.img.src = `images/ground2.png`;



// Ground after the cave (uses ground2) (FIX)
var ground2 = new GameObject({
    width: canvas.width * 10, 
    x: 1024 + (canvas.width * 10) / 2,  // should start at cave entrance
    height: 64,
    y: canvas.height - 32,
    world: level
});
ground2.img.src = `images/ground2.png`;



//A platform
var plat = new GameObject({width:256, height:64,y:canvas.height-200, color:"green", world:level})



var leftBorder = new GameObject({width:50, height:canvas.height, world:level, x:0})


//Cave foreground Tile Grid
var cave = new Grid(caveData, {world:level, x:1024, tileHeight:64, tileWidth:64});
//Cave background Tile Grid
var caveBack = new Grid(caveBackData, {world:level, x:1024, tileHeight:64, tileWidth:64});
//cave hitbox grid
var caveHit = new Grid(caveHitData, {world:level, x:1024, tileHeight:64, tileWidth:64});




var bg2 = new GameObject({
    x: level.x,
    y: level.y,
    width: canvas.width * 4,   // match your bg size
    height: canvas.height,
    world: level
});
bg2.img.src = "images/bg2.png";




//This is a group used for collisions
var g1 = new Group();
g1.color= `rgb(251,0,254)`;

//Adds items to a group
g1.add([ground, leftBorder, caveHit.grid])

g1.add([ground2]);



//removes items from a group
//g1.remove([plat, cave.grid])

//Used to draw the rectangles
var rects = new Group();
rects.add([ground,plat])



//used to render the sprites
var sprites = new Group();
sprites.add([caveBack.grid])

var front = new Group()
front.add([cave.grid])

//list of items to be rendered in the level
var levelItems=new Group();
levelItems.add([caveBack.grid, ground, plat, cave.grid]);

//Very back background
var sky = new GameObject({width:canvas.width, height:canvas.height, color:"cyan"})
sky.img.src = `images/sky.png`

/*
    //Not used, unless you want a 4th level of paralax
    var clouds = new GameObject({x:level.x,y:level.y})
    clouds.img.src=`images/ground.png`
*/

//repeating background
var rbg = new GameObject({x:level.x, y:level.y, width:1024, height:512})
rbg.img.src=`images/hills.png`

//middleground
var bg = new GameObject({x:level.x,y:level.y, width:canvas.width*4, height:canvas.height})
bg.img.src=`images/bgfull.png`

/*------------------vvBULLET STUFFvv----------------------*/


var bullets = [];
var canShoot = true;
var shotTimer = 0;
var shotDelay = 21;
var currentBullet = 0;

for (let i = 0; i < 100; i++) {
    bullets[i] = new GameObject({
        width: 64,
        height: 64
    });

    // static image bullet
    bullets[i].img.src = "images/blast.png";
    bullets[i].y = -10000;
}

// var bullets=[]
// var canShoot=true;
// var shotTimer = 0;
// var shotDelay = 21;
// var currentBullet = 0;

// for(let i=0; i<100; i++)
// {
//  bullets[i] = new GameObject({width:64, height:64})
//  bullets[i].img.src="images/blast.jpg"
//  //bullets[i].makeSprite(playerData)
//  //bullets[i].y=-10000
//  //bullets[i].changeState(`walk`) //this is attack anim thingy
// }

//console.log(bullets)

/*------------------^^BULLET STUFF^^----------------------*/

gameStates[`level1`] = function()
{
    if (bgMusic.paused) {
        bgMusic.play();
    }

    if(!keys[`W`] && !keys[`S`] && !keys[`D`] && !keys[`A`] && !keys[` `] && canShoot && wiz.canJump)
    {
        wiz.changeState(`idle`)
    }
    
    
    if(keys[`S`])
    {
        wiz.top={x:0,y:0};
        wiz.changeState(`crouch`)
    }
    else
    {
        wiz.top={x:0,y:-wiz.hitBoxHeight/2};
    }

    if(keys[`D`]  )
    {
        wiz.dir=1;
        if(wiz.currentState != `crouch`) 
        {
            if(wiz.canJump)wiz.changeState(`walk`)
            wiz.vx += wiz.force
            
        }
        
    }
    if(keys[`A`] )
    {
        wiz.dir=-1;
        if(wiz.currentState != `crouch` ) 
        {
            if(wiz.canJump)wiz.changeState(`walk`)
            wiz.vx += -wiz.force
        }
        
    }
    if(keys[`W`] && wiz.canJump )
    {
        wiz.canJump = false;
        wiz.vy = wiz.jumpHeight;
        wiz.changeState(`jump`);

        jumpSound.currentTime = 0;
        jumpSound.play();
    }

    shotTimer--;
    if(shotTimer <=0)
    {
        canShoot=true
    }
    else
    {
        canShoot=false;
    }

if(keys[` `] )
{
    if(canShoot)
    {
        wiz.changeState(`attack`)
        shotTimer = shotDelay

        attackSound.currentTime = 0;
        attackSound.play();

        bullets[currentBullet].vx = 5*wiz.dir;
        bullets[currentBullet].world = level;
        bullets[currentBullet].x = wiz.x-level.x + (wiz.dir * 96);
        bullets[currentBullet].y = wiz.y + 20;
        bullets[currentBullet].dir = wiz.dir;

        currentBullet++;
        if(currentBullet>=bullets.length)
        {
            currentBullet=0
        }
    }
}


    else
    {
        shotTimer=0
    }
    
    //-----Player movement-----///
    wiz.vy+= gravity
    wiz.vx *= friction.x
    wiz.vy *= friction.y
    wiz.x += Math.round(wiz.vx)
    wiz.y += Math.round(wiz.vy)

    let offset = {x:Math.round(wiz.vx), y:Math.round(wiz.vy)}
    
    while (plat.overlap(wiz.bottom) && wiz.vy>=0)
    {
        wiz.vy=0;
        wiz.canJump = true;
        wiz.y--;
        offset.y--;
    }

    /*---------Player Collision---------*/
    /*if(wiz.overlap(plat,`bottom`,`x`))
    {
        wiz.vy=-10;
    }*/

    while(g1.collide(wiz.bottom) && wiz.vy>=0)
    {
        wiz.canJump = true;
            wiz.vy=0;
            wiz.y--;
            offset.y--;
    }
    while(g1.collide(wiz.top) && wiz.vy<=0 )
    {
            wiz.vy=0;
            wiz.y++;
            offset.y++;
    }
    while(g1.collide(wiz.left) && wiz.vx<=0 )
    {
        
            wiz.vx=0;
            wiz.x++;
            offset.x++;
    }
    while(g1.collide(wiz.right) && wiz.vx>=0 )
    {
        
            wiz.vx=0;
            wiz.x--;
            offset.x--;
    }

    if(wiz.x < canvas.width*.33 || wiz.x > canvas.width *.66)
    {
    //Makes the level move
        wiz.x -= offset.x;
        level.x -= offset.x;

    //moves repeating background
        rbg.x -= offset.x*.5;

    //moves the middleground
        bg.x -= offset.x*.75;
    }

    //moves the clouds
    //clouds.x = level.x*.25;
    
    if(rbg.x < -rbg.width || rbg.x > rbg.width)
    {
        rbg.x=0; 
    }

    
    
    //Sets up pattern for the ground
    var groundPattern = context.createPattern(ground.img, `repeat`);
    //Applies pattern to ground and platform
    ground.color = groundPattern
    plat.color = groundPattern

    //Sets up pattern for the sky
    var skyPattern = context.createPattern(sky.img, `repeat`);
    //Applies pattern to sky
    sky.color = skyPattern

    //renders the sky
    sky.render()
    
    //Renders the repeating background
    rbg.drawStaticImage({x:0,y:0});
    rbg.drawStaticImage({x:-rbg.width,y:0});
    rbg.drawStaticImage({x:rbg.width,y:0});

    //renders the midground
    bg.drawStaticImage({x:0,y:0});
    
    //alternate methd for rendering the repeating background
    //rbg.render(`drawStaticImage`, [0,0])

    //renders the objects in the rect group
    rects.render(`drawRect`)
    
    /*----Used for debugging----*/
    /*context.beginPath()
    context.moveTo(0,wiz.bottom.y)
    context.lineTo(canvas.width,wiz.bottom.y)
    context.stroke();*/

    //Renders sprites group
    sprites.play().render(`drawSprite`);

    //renders player
    wiz.play(function(){return}).drawSprite()
    
    //Moves, checks collision and renders projectiles.
    for(let i=0; i<bullets.length; i++)
    {
        if(bullets[i].overlap(stage)) bullets[i].vy+=1;
        bullets[i].move()
        //bullets[i].play(function(){return}).drawSprite()
        bullets[i].drawStaticImage();
        //bullets[i].angle+=10
        while(g1.collide(bullets[i].bottom) && bullets[i].vy>=0)
        {
            
            bullets[i].vy=0;
            bullets[i].y--;
            
        }
    }

    
    
    //Renders front of cave
    front.play().render(`drawSprite`);
    
    

}
