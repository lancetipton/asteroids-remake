function buildBullets(){

  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;

  bullets.createMultiple(40, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);
  bullets.setAll('width', 10);
  bullets.setAll('height', 5);

}

function buildRockets(){
  rockets = game.add.group();
  rockets.enableBody = true;
  rockets.physicsBodyType = Phaser.Physics.ARCADE;

  rockets.createMultiple(40, 'bullet');
  rockets.setAll('anchor.x', 0.5);
  rockets.setAll('anchor.y', 0.5);
  rockets.setAll('width', 20);
  rockets.setAll('height', 10);

}

function bomb(){

}