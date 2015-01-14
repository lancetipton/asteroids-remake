// Copyright © 2014 Demircan Celebi
// Licensed under the terms of the MIT License

var GameState = function(game) {};

GameState.prototype.preload = function() {
  game.load.image('player1', 'public/images/player1.png');
  game.load.image('player2', 'public/images/player2.png');
  game.load.image('ball', 'public/images/ball.png');
  game.load.image('sky', 'public/images/sky.png');

};

GameState.prototype.create = function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.left = false;
  game.physics.arcade.checkCollision.right = false;

  game.add.sprite(0, 0, 'sky');

  player1 = game.add.sprite(32, 300, 'player1');
  player1Points = 0;

  player2 = game.add.sprite(738, 300, 'player2');
  player2Points = 0;

  ball = game.add.sprite(400, 300, 'ball');
  ball.anchor.set(0.5);
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(ballLost, this);

  game.physics.arcade.enable(player1);

  game.physics.arcade.enable(player2);
  game.physics.enable(ball, Phaser.Physics.ARCADE);


  player1.body.bounce.set(1);
  player1.body.immovable = true;

  player2.body.bounce.set(1);
  player2.body.immovable = true;

  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.body.allowGravity = false;

  player2.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  player2.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  player1.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
  player1.down = game.input.keyboard.addKey(Phaser.Keyboard.S);


  player1Score = game.add.text(32, 550, 'Player 1: ' + player1Points, { font: "20px Arial", fill: "#ffffff", align: "left" });
  player2Score = game.add.text(680, 550, 'Player 2: ' + player2Points, { font: "20px Arial", fill: "#ffffff", align: "right" });
  introText = game.add.text(400, 250, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
  winText = game.add.text(400, 250, '', { font: "40px Arial", fill: "#ffffff", align: "center" });
  winText.visible = false;
  introText.anchor.setTo(0.5, 0.5);
  winText.anchor.setTo(0.5, 0.5);
  game.input.onDown.add(startGame, this);
  gameOver = false;

};

GameState.prototype.update = function() {

  game.physics.arcade.overlap(ball, player1, ballHitPaddle, null, this);
  game.physics.arcade.overlap(ball, player2, ballHitPaddle, null, this);

  if(player1.up.isDown){
    player1.body.velocity.y = -400;
  };
  if(player1.down.isDown){
    player1.body.velocity.y = 400;
  };

  if(player1.down.isUp && player1.up.isUp){
      if(player1.body.velocity.y > 0){
        player1.body.velocity.y -= 40;
      }
      else if(player1.body.velocity.y < 0){
        player1.body.velocity.y += 40;
      }
  };

  if(player2.up.isDown){
    player2.body.velocity.y = -400;
  };
  if(player2.down.isDown){
    player2.body.velocity.y = 400;
  };

  if(player2.down.isUp && player2.up.isUp){
      if(player2.body.velocity.y > 0){
        player2.body.velocity.y -= 40;
      }
      else if(player2.body.velocity.y < 0){
        player2.body.velocity.y += 40;
      }
  };

};


function randomNumber(min, max){
  var randomValue = Math.random()
  if(randomValue < 0.5){
    randomValue = -1
  }
  else{
    randomValue = 1
  };

  randomNum = ((Math.random() * (max - min) + min) * randomValue);
  return Math.floor(randomNum);
};

function ballHitPaddle (_ball, _player) {
      if (_player == player1){
          _ball.body.velocity.x = _ball.body.velocity.x + 500;
      }
      else if (_player == player2){
          _ball.body.velocity.x = _ball.body.velocity.x - 500;
      };


}


function ballLost(){
  if(ball.x > 800){
    player1Points ++;
    player1Score.text = 'Player 1: ' + player1Points;
    resetBall();
  }
  else if (ball.x < 0){
    player2Points ++;
    player2Score.text = 'Player 1: ' + player2Points;
    resetBall();
  };

  checkWin();

}

function startGame(){
  gameOver = false;
  ball.body.velocity.setTo(randomNumber(100, 200), randomNumber(100, 200));
  introText.visible = false;
  winText.visible = false;
  player1Points = 0;
  player2Points = 0;
  player1Score.text = 'Player 1: ' + player1Points;
  player2Score.text = 'Player 2: ' + player1Points;
  ball.x = 400;
  ball.y = 300;
  player1.y = 300;
  player2.y = 300;
}


function resetBall(){
  if(checkWin() == false){
    ball.body.velocity.setTo(randomNumber(100, 200), randomNumber(100, 200));
    introText.visible = true;
    introText.text = "Get ready for next round!"
    setTimeout(function() {
      ball.x = 400;
      ball.y = 300;
      introText.visible = false;
    },2000);
  };
}

function checkWin(){
  if (player1Points >= 3){
    winText.visible = true;
    game.input.onDown.add(startGame, this);
    winText.text = "Player 1 Wins!"
    return gameOver = true;
  }
  else if (player2Points >= 3){
    winText.visible = true;
    winText.text = "Player 2 Wins!"
    game.input.onDown.add(startGame, this);
    return gameOver = true;
  }
  else{
    return false;
  }

}

// Setup game
var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('game', GameState, true);