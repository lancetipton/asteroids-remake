allPlayers = []

function Player(playerInfo) {
  this.id = playerInfo['id'],
  this.picLoad = playerInfo['picLoad'],
  this.points = 0,
  this.canMoveUp = true,
  this.canMoveDown = true
};

Player.prototype.checkMovement = function(){
    if(this.moveUp.isDown){
      player.avatar.body.velocity.y = -400;
    }

  if(player.canMoveDown){
    if (this.moveDown.isDown){
      player.avatar.body.velocity.y = 400;
    };
  };

  if(this.moveDown.isUp && this.moveUp.isUp){
      if(this.avatar.body.velocity.y > 0){
        this.avatar.body.velocity.y -= 40;
      }
      else if(this.avatar.body.velocity.y < 0){
        this.avatar.body.velocity.y += 40;
      };
  };
}

Player.prototype.checkBounds = function(){
  if(this.avatar.y <= 5){
    this.avatar.y = 5;
  };

  if (this.avatar.y >= 500){
    this.avatar.y = 500;
  };
}


firstPlayer = {
    id: 0,
    spriteName: 'player1',
    picLoad: 'public/images/player1.png'
};

secondPlayer = {
    id: 1,
    spriteName: 'player2',
    picLoad: 'public/images/player2.png'
};

function buildPlayers(){
  player1 = new Player(firstPlayer);
  player1.avatar = game.add.sprite(32, 300, 'player1');
  game.physics.arcade.enable(player1.avatar);
  player1.hud = game.add.text(32, 550, 'Player 1: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  player1.moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
  player1.moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
  player1.avatar.body.bounce.set(1);
  player1.avatar.body.immovable = true;
  allPlayers.push(player1);

  player2 = new Player(secondPlayer);
  player2.avatar = game.add.sprite(740, 300, 'player2');
  game.physics.arcade.enable(player2.avatar);
  player2.hud = game.add.text(660, 550, 'Player 2: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  player2.moveUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  player2.moveDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  player2.avatar.body.bounce.set(1);
  player2.avatar.body.immovable = true;

  allPlayers.push(player2);
}