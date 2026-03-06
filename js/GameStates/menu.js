/*---------------------------------
This file contains all of the code for the Main Menu
----------------------------------*/

var startButton = new GameObject();
startButton.img.src="images/start.png"
startButton.width=300;
startButton.hitBoxWidth=800
console.log(startButton.collisionPoints.right)


var menuBackground = new GameObject();
menuBackground.img.src = "images/purp.png"
menuBackground.width=canvas.width
menuBackground.height=canvas.height

gameStates[`menu`] = function() {

    // Hover + click
    if (startButton.overlap(mouse)) {
        if (mouse.pressed) {
            gameStates.changeState(`level1`);
        }
        startButton.scale = 1.07;
    } else {
        startButton.scale = 1.0;
    }

    // Draw background
    menuBackground.drawStaticImage();

    // Draw start button image
    let scaledW = startButton.width * startButton.scale;
	let scaledH = startButton.height * startButton.scale;

	startButton.drawStaticImage({
    x: -scaledW / 2,
    y: -scaledH / 2,
    w: scaledW,
    h: scaledH
});

};

	
	
