// Copyright © 2014 Demircan Celebi
// Licensed under the terms of the MIT License


var play = {

  preload: function() {
    game.load.image('background', 'public/images/background.png');
    game.load.image('ship', 'public/images/ship.png');
    game.load.image('bullet', 'public/images/bullet.png');

    game.load.image('bg01', 'public/images/asteroids/bg01.png');
    game.load.image('bg02', 'public/images/asteroids/bg02.png');
    game.load.image('bg03', 'public/images/asteroids/bg03.png');
    game.load.image('bg04', 'public/images/asteroids/bg04.png');
    game.load.image('bg05', 'public/images/asteroids/bg05.png');
    game.load.image('bg06', 'public/images/asteroids/bg06.png');
    game.load.image('bg07', 'public/images/asteroids/bg07.png');

    game.load.image('med01', 'public/images/asteroids/med01.png');
    game.load.image('med02', 'public/images/asteroids/med02.png');
    game.load.image('med03', 'public/images/asteroids/med03.png');
    game.load.image('med04', 'public/images/asteroids/med04.png');
    game.load.image('med05', 'public/images/asteroids/med05.png');
    game.load.image('med06', 'public/images/asteroids/med06.png');
    game.load.image('med07', 'public/images/asteroids/med07.png');

    game.load.image('sm01', 'public/images/asteroids/sm01.png');
    game.load.image('sm02', 'public/images/asteroids/sm02.png');
    game.load.image('sm03', 'public/images/asteroids/sm03.png');
    game.load.image('sm04', 'public/images/asteroids/sm04.png');
    game.load.image('sm05', 'public/images/asteroids/sm05.png');
    game.load.image('sm06', 'public/images/asteroids/sm06.png');
    game.load.image('sm07', 'public/images/asteroids/sm07.png');
  },



  create: function() {


    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, game.width, game.height, 'background');

    winText = game.add.text(400, 250, 'You win, standby for Game-Reset!', { font: "40px Arial", fill: "#ffffff", align: "center" });
    winText.visible = false;
    winText.anchor.setTo(0.5, 0.5);


    buildBullets();
    buildAsteriods();
    buildPlayers();

  },



  update: function() {

    for(var i = 0; i < allPlayers.length; i++){
        player = allPlayers[i];
        player.checkMovement();
    // game.physics.arcade.collide(bigAsteroids, bigAsteroids, null, this);

        game.physics.arcade.collide(player.ship, bigAsteroids, shipHitAsteroid.bind(player), null, this);
        game.physics.arcade.collide(player.ship, medAsteroids, shipHitAsteroid.bind(player), null, this);
        game.physics.arcade.collide(player.ship, smallAsteroids, shipHitAsteroid.bind(player), null, this);

        screenWrap(player.ship);
        checkWin(player);
    };

    allScreenWrap();
    worldColliders();



  }

};



function checkWin(player){
    if(bigAsteroids.countLiving() == 0 && medAsteroids.countLiving() == 0 && smallAsteroids.countLiving() == 0 && player.gameWin == false ){
        console.log(game);
        console.log(game.state);
        game.state.restart();
        player.gameWin = true
        winGame();
    };

};

function winGame(){
    if (player.gameWin == true){
        totalScore += player.points;
        game.state.start('main');
    };

}


function worldColliders(){
    game.physics.arcade.collide(bullets, bigAsteroids, bulletHitBigAsteroid.bind(player), null, this);
    game.physics.arcade.collide(bullets, medAsteroids, bulletHitMedAsteroid.bind(player), null, this);
    game.physics.arcade.collide(bullets, smallAsteroids, bulletHitSmallAsteroid.bind(player), null, this);
    game.physics.arcade.collide(bigAsteroids, smallAsteroids);
    game.physics.arcade.collide(bigAsteroids, bigAsteroids);
    game.physics.arcade.collide(bigAsteroids, medAsteroids);
    game.physics.arcade.collide(medAsteroids, medAsteroids);
    game.physics.arcade.collide(smallAsteroids, medAsteroids);
    game.physics.arcade.collide(smallAsteroids, smallAsteroids);


}

function allScreenWrap(){
    bullets.forEachExists(screenWrap, this);
    bigAsteroids.forEachExists(screenWrap, this);
    medAsteroids.forEachExists(screenWrap, this);
    smallAsteroids.forEachExists(screenWrap, this);
}


function bulletHitBigAsteroid(bullet, asteroid){
    var posX = asteroid.x;
    var posY = asteroid.y;
    asteroid.kill();
    bullet.kill();
    this.updatePoints(50)

    for(var i = 0; i < 2; i ++){
        var medAsteriod = buildMedAsteriods(1);
        asteroidFloat(medAsteriod);
        medAsteriod.x = posX;
        medAsteriod.y = posY;
    }

};

function bulletHitMedAsteroid(bullet, asteroid){
    var posX = asteroid.x;
    var posY = asteroid.y;
    asteroid.kill();
    bullet.kill();
    this.updatePoints(50)

    for(var i = 0; i < 4; i ++){
        var smallAsteriod = buildSmallAsteriods(1);
        asteroidFloat(smallAsteriod);
        smallAsteriod.x = posX;
        smallAsteriod.y = posY;
    };


}

function bulletHitSmallAsteroid(bullet, asteroid){
    asteroid.kill();
    bullet.kill();
    this.updatePoints(50)
}


function shipHitAsteroid(ship, asteroid){
    if(this.canBeHit == true){
        asteroid.kill();
        ship.kill();
        this.lives --
        this.canShoot = false;
        this.updatePoints(-100)
        this.reset(this);
    };

};


function randomNumberNeg(min, max){

    var randomValue = Math.random()
    if(randomValue < 0.6){
    randomValue = -1
    }
    else{
    randomValue = 1
    };

    var randomNum = ( ((Math.random() * (max - min)) + min) * randomValue );
    var finalOutput = Math.floor(randomNum);
    return finalOutput;
};

function randomNumberPos(min, max){
    var randomValue = Math.random()
    var randomNum = ( (Math.random() * (max - min)) + min );
    var finalOutput = Math.floor(randomNum);
    return finalOutput;
};




function screenWrap (object) {

    if (object.x < -10){
        object.x = game.width + 10;
    }
    else if (object.x > game.width + 10){
        object.x = -10;
    }

    if (object.y < -10){
        object.y = game.height + 10;
    }
    else if (object.y > game.height + 10){
        object.y = -10;
    }

}



var main = {
  preload: function() {
    // load the play button into this game state:
    game.load.image('start', 'public/images/gui/start.png');
    game.load.image('background', 'public/images/background.png');
  },
  create: function(){
    game.add.sprite(0, 0, 'background');
    currentLevel = Easy;


    totalScoreText = game.add.text(400, 250, 'Total Points: ' + totalScore, { font: "40px Arial", fill: "#ffffff", align: "center" });
    totalScoreText.anchor.setTo(0.5, 0.5);

    var startBtn = game.add.sprite(300, game.world.centerY, 'start');

    //  Enables all kind of input actions on this image (click, etc)
    startBtn.inputEnabled = true;

    // When we click on the button, it will do the below. playGame is the function it will run when clicked.
    // game.input.onDown.addOnce(playGame, this);
    startBtn.events.onInputDown.add(playGame, this);

  }
}

function playGame(){
  game.state.start('play');
};



// Setup game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 'gameDiv');
game.state.add('play', play);
game.state.add('main', main);
game.state.start('main');


