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
  this.shootCount = 0,
  this.bulletKill = currentLevel.bulletKill,
  this.gameOver = false,
  this.item = ''

};

Player.prototype.gotItem = function(pickedUpItem, player){
  console.log('got item');
  this.item = pickedUpItem;
  console.log(this.item);
}


Player.prototype.updatePoints = function(points){
  this.points += points;
  this.hud.text =  this.name + ' Lives: ' + this.lives + '   Points: ' + this.points;
}

Player.prototype.moveShipUp = function(){
  game.physics.arcade.accelerationFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
}

Player.prototype.moveShipDown = function(){
  game.physics.arcade.accelerationFromRotation(this.ship.rotation, -200, this.ship.body.acceleration);
}

Player.prototype.moveShipLeft = function(){
  this.ship.body.angularVelocity = -300;
}

Player.prototype.moveShipRight = function(){
  this.ship.body.angularVelocity = 300;
}

Player.prototype.stopAcceleration = function(){
  this.ship.body.acceleration.set(0);
}

Player.prototype.stopAngular = function(){
  this.ship.body.angularVelocity = 0;
}



Player.prototype.checkMovement = function(){
    if (this.moveUp.isDown){
        movePlayer({id: this.id, move: 'up' });
    }
    else if (this.moveDown.isDown){
      movePlayer({id: this.id, move: 'down' });
    }
    else{
        movePlayer({id: this.id, move: 'acceleration' });
    };

    if (this.turnLeft.isDown){
        movePlayer({id: this.id, move: 'left' });
    }
    else if (this.turnRight.isDown){
        movePlayer({id: this.id, move: 'right' });
    }
    else{
      movePlayer({id: this.id, move: 'angular' });
    };

    if (this.shoot.isDown){
      playerShoot({id: this.id, fire: 'bullet' });
    }
    else if (this.shootRocket.isDown){
      playerShoot({id: this.id, fire: 'rocket' });
    };

};



Player.prototype.fireRocket = function () {
  if(this.item == 'rocket' && this.shootCount < 11){
    this.shootCount ++;
    if (game.time.now > this.bulletTime){
      rocket = rockets.getFirstExists(false);
      if (rocket){
          this.updatePoints(-100)
          rocket.reset(this.ship.body.x + 16, this.ship.body.y + 16);
          rocket.lifespan = currentLevel.bulletLifespan;
          rocket.rotation = this.ship.rotation;
          game.physics.arcade.velocityFromRotation(this.ship.rotation, 400, rocket.body.velocity);
          this.bulletTime = game.time.now + this.bulletKill;

      };

    };

  }
  else{
    this.item = 'empty';
    this.shootCount = 0;
  };
};


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
    if(this.name != 'Player 1'){
      if(player.points < totalScore){
        scoreToSend = (totalScore - player.points) * -1;
        updatePlayerScoreOnServer(scoreToSend);
      };
    };
    endGame();
  };

};



playerTemplate = {
    id: 0,
    name: '',
    points: 0,
    lives: 1,
    canBeHit: false,
    sprite: 'ship',
    startPosX: 400,
    startPosY: 300,
    anchor: 0.5
};





function buildPlayers(numOfPlayers){
  for(var i = 0; i < numOfPlayers; i++){

    var player = new Player(playerTemplate);
    player.ship = game.add.sprite(randomNumberPos(0, 750), randomNumberPos(0, 500), player.sprite);
    game.physics.enable(player.ship, Phaser.Physics.ARCADE);
    player.moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
    player.moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
    player.turnLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
    player.turnRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
    player.shoot = game.input.keyboard.addKey(Phaser.Keyboard.G);
    player.shootRocket = game.input.keyboard.addKey(Phaser.Keyboard.H);
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
  };

}
