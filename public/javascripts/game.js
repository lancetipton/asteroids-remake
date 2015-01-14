// Copyright © 2014 Demircan Celebi
// Licensed under the terms of the MIT License


var play = {

  preload: function() {
    game.load.image('ball', 'public/images/ball.png');
    game.load.image('sky', 'public/images/sky.png');
    game.load.image( 'player1','public/images/player1.png');
    game.load.image( 'player2', 'public/images/player2.png');
  },

  create: function() {
    gameSettings();
    buildPlayers();
    buildBall();
  },

  update: function() {

    for (var i = 0; i < allPlayers.length; i ++){
      player = allPlayers[i];

      game.physics.arcade.collide(player.avatar, ball.avatar, addVelocity.bind(player), null, this);
      player.checkMovement();
      player.checkBounds();

    };

    ball.avatar.body.velocity.x += .05
  }


}


function randomNumber(min, max){
  var randomValue = Math.random()
  if(randomValue < 0.6){
    randomValue = -1
  }
  else{
    randomValue = 1
  };

  randomNum = ((Math.random() * (max - min) + min) * randomValue);
  return Math.floor(randomNum);
};



function ballLost(){
  if(ball.avatar.x > 800){
    player1.points ++;
    player1.hud.text = 'Player 1: ' + player1.points;
    resetBall();
  }
  else if (ball.avatar.x < 0){
    player2.points ++;
    player2.hud.text = 'Player 2: ' + player2.points;
    resetBall();
  };

  checkWin();

}

function startGame(){
  gameOver = false;
  ball.avatar.body.velocity.setTo(randomNumber(100, 200), randomNumber(100, 200));
  introText.visible = false;
  winText.visible = false;
  player1.points = 0;
  player2.points = 0;
  player1.hud.text = 'Player 1: ' + player1.points;
  player2.hud.text = 'Player 2: ' + player2.points;
  ball.avatar.x = 400;
  ball.avatar.y = 300;
  player1.avatar.y = 300;
  player2.avatar.y = 300;
}


function resetBall(){
  if(checkWin() == false){
    ball.avatar.x = 400;
    ball.avatar.y = 300;
    ball.avatar.body.velocity.setTo(0, 0);
    introText.visible = true;
    introText.text = "Get ready for next round!"
    setTimeout(function() {
      ball.avatar.body.velocity.setTo(randomNumber(100, 200), randomNumber(100, 200));
      player1.avatar.y = 300;
      player2.avatar.y = 300;
      introText.visible = false;
    },2000);
  };
}

function checkWin(){
  if (player1.points >= 3){
    winText.visible = true;
    game.input.onDown.add(startGame, this);
    winText.text = "Player 1 Wins!"
    return gameOver = true;
  }
  else if (player2.points >= 3){
    winText.visible = true;
    winText.text = "Player 2 Wins!"
    game.input.onDown.add(startGame, this);
    return gameOver = true;
  }
  else{
    return false;
  }

}


function addVelocity(){
  if(this.id == 0){
    ball.avatar.body.velocity.x += 100;
  }
  else {
    ball.avatar.body.velocity.x -= 100;
  }
}

function gameSettings(){
  game.add.sprite(0, 0, 'sky');
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.left = false;
  game.physics.arcade.checkCollision.right = false;
  introText = game.add.text(400, 250, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
  winText = game.add.text(400, 250, '', { font: "40px Arial", fill: "#ffffff", align: "center" });
  winText.visible = false;
  introText.anchor.setTo(0.5, 0.5);
  winText.anchor.setTo(0.5, 0.5);
  game.input.onDown.add(startGame, this);
  gameOver = false;

};

// Setup game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 'gameDiv');
game.state.add('play', play);
game.state.start('play');


