allPlayers = []
totalScore = 0;
playerName = '';

function Player(playerInfo) {
  this.id = playerInfo['id'],
  this.name = playerInfo['name']
  this.points = playerInfo['points'],
  this.bulletTime = 0,
  this.lives = playerInfo['lives'],
  this.canBeHit = playerInfo['canBeHit'],
  this.sprite = playerInfo['sprite'],
  this.startPosX = playerInfo['startPosX'],
  this.startPosY = playerInfo['startPosY'],
  this.anchor = playerInfo['anchor'],
  this.canShoot = true,
  this.shootCount = 10,
  this.bulletKill = currentLevel.bulletKill,
  this.gameOver = false

};

Player.prototype.updatePoints = function(points){
  this.points += points;
  this.hud.text =  this.name + ' Lives: ' + this.lives + '   Points: ' + this.points;
}

Player.prototype.checkMovement = function(){
    if (this.moveUp.isDown){
        game.physics.arcade.accelerationFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
    }
    else if (this.moveDown.isDown){
        game.physics.arcade.accelerationFromRotation(this.ship.rotation, -200, this.ship.body.acceleration);
    }
    else{
        this.ship.body.acceleration.set(0);
    };

    if (this.turnLeft.isDown){
        this.ship.body.angularVelocity = -300;
    }
    else if (this.turnRight.isDown){
        this.ship.body.angularVelocity = 300;
    }
    else{
        this.ship.body.angularVelocity = 0;
    };

    if (this.shoot.isDown){
        this.fireBullet();
    };

}

Player.prototype.fireBullet = function () {
  if(this.canShoot == true){
    if (game.time.now > this.bulletTime){
        bullet = bullets.getFirstExists(false);

        if (bullet){
            this.updatePoints(-10)
            bullet.reset(this.ship.body.x + 16, this.ship.body.y + 16);
            bullet.lifespan = currentLevel.bulletLifespan;
            bullet.rotation = this.ship.rotation;
            game.physics.arcade.velocityFromRotation(this.ship.rotation, 400, bullet.body.velocity);
            this.bulletTime = game.time.now + this.bulletKill;
        };
    };

  };

}


Player.prototype.reset = function(player) {
  if(this.lives > 0){
      setTimeout(function() {
        player.ship.revive();
        player.ship.y = 300;
        player.ship.x = 400;
        player.ship.body.angularVelocity = 0;
        player.ship.body.acceleration.set(0);
        player.canBeHit = false;
        player.canShoot = true;
        setTimeout(function(){
          player.canBeHit = true;
        }, 5000);

      },2000);


  }
  else{
    this.gameOver = true;
    if(player.points < totalScore){
      scoreToSend = ((totalScore - player.points) * -1);
      updatePlayerScoreOnServer(scoreToSend);
    };
    endGame();
  };

};



playerTemplate = {
    id: 0,
    name: '',
    points: 0,
    lives: 3,
    canBeHit: false,
    sprite: 'ship',
    startPosX: 400,
    startPosY: 300,
    anchor: 0.5
};





function buildPlayers(){
  player = new Player(playerTemplate);
  player.ship = game.add.sprite(400,300, player.sprite);
  game.physics.enable(player.ship, Phaser.Physics.ARCADE);
  player.moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
  player.moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
  player.turnLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
  player.turnRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
  player.shoot = game.input.keyboard.addKey(Phaser.Keyboard.G);
  player.ship.anchor.set(0.5, 0.5);
  player.ship.body.drag.set(100);
  player.ship.body.maxVelocity.set(200);
  player.ship.body.width = 29;
  player.ship.body.height = 23;
  player.hud = game.add.text(32, 550, player.name + ' Lives ' + player.lives + '   Points: ' + player.points, { font: "20px Arial", fill: "#ffffff", align: "left" });

  setTimeout(function(){
    player.canBeHit = true;
  }, 2000);

  allPlayers.push(player);


}
