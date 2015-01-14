function Ball(){
  this.spriteName = 'ball',
  this.isLeft = false,
  this.avatar = ''
};

function buildBall(){
    ball = new Ball();
    ball.avatar = game.add.sprite(400, 300, 'ball')
    game.physics.enable(ball.avatar, Phaser.Physics.ARCADE);
    ball.avatar.checkWorldBounds = true;
    ball.avatar.body.collideWorldBounds = true;
    ball.avatar.body.bounce.set(1);
    ball.avatar.body.allowGravity = false;
    ball.avatar.anchor.set(0.5);

    ball.avatar.events.onOutOfBounds.add(ballLost, this);
}


