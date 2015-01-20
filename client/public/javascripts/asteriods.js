bigAsteroidsSprites = ['bg01', 'bg02', 'bg03', 'bg04', 'bg05', 'bg06', 'bg07'];
medAsteroidsSprites = ['med01', 'med02', 'med03', 'med04', 'med05', 'med06', 'med06'];
smAsteroidsSprites = ['sm01', 'sm02', 'sm03', 'sm04', 'sm05', 'sm06', 'sm07'];

currentLevel = '';

var Easy ={
  asteroidAmount: randomNumberPos(2, 2),
  speed: 80,
  bulletKill: 100,
  bulletLifespan: 4000,
  asteroidHitPoints: 100,
  playerDeathPoints: -10

}
var Hard = {
  asteroidAmount: randomNumberPos(4, 10),
  speed: 200,
  bulletKill: 300,
  bulletLifespan: 400,
  asteroidHitPoints: 25,
  playerDeathPoints: -1000
}


function buildAsteriods(){
    buildBigAsteriodsGroup();
    buildMedAsteriodsGroup();
    buildSmallAsteriodsGroup();
}

function buildBigAsteriodsGroup(){
    bigAsteroids = game.add.group();
    bigAsteroids.enableBody = true;
    bigAsteroids.physicsBodyType = Phaser.Physics.ARCADE;


    buildBigAsteriods(currentLevel.asteroidAmount);

};


function buildMedAsteriodsGroup(){
    medAsteroids = game.add.group();
    medAsteroids.enableBody = true;
    medAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
    buildMedAsteriods(currentLevel.asteroidAmount);

};

function buildSmallAsteriodsGroup(){

    smallAsteroids = game.add.group();
    smallAsteroids.enableBody = true;
    smallAsteroids.physicsBodyType = Phaser.Physics.ARCADE;

    buildSmallAsteriods(currentLevel.asteroidAmount);
}

function buildBigAsteriods(howMany){

  var asteroid = ''
  for(var i = 0; i < howMany; i ++){
    var sprite = bigAsteroidsSprites[randomNumberPos(0, 6)]
    var asteroid = bigAsteroids.create(randomNumberPos(0, 750), randomNumberPos(0, 500), sprite);
    asteroid.enableBody = true;
    asteroid.body.width = 45;
    asteroid.body.height = 48;
    asteroidFloat(asteroid);
  };

  bigAsteroids.setAll('anchor.x', 0.5);
  bigAsteroids.setAll('anchor.y', 0.5);

}

function buildMedAsteriods(howMany){
  var asteroid = ''
  for(var i = 0; i < howMany; i ++){
    var sprite = medAsteroidsSprites[randomNumberPos(0, 6)]
    asteroid = medAsteroids.create(randomNumberPos(0, 750), randomNumberPos(0, 500), sprite);
    asteroid.enableBody = true;
    asteroid.body.width = 36;
    asteroid.body.height = 36;
    asteroidFloat(asteroid);
  };

  medAsteroids.setAll('anchor.x', 0.5);
  medAsteroids.setAll('anchor.y', 0.5);

    if(howMany == 1){
      return asteroid
    };
}

function buildSmallAsteriods(howMany){
  var asteroid = ''
  for(var i = 0; i < howMany; i ++){
    var sprite = smAsteroidsSprites[randomNumberPos(0, 6)]
    var asteroid = smallAsteroids.create(randomNumberPos(0, 750), randomNumberPos(0, 500), sprite);
    asteroid.enableBody = true;
    asteroid.body.width = 20;
    asteroid.body.height = 20;
    asteroidFloat(asteroid);
  };

  smallAsteroids.setAll('anchor.x', 0.5);
  smallAsteroids.setAll('anchor.y', 0.5);

  if(howMany == 1){
    return asteroid
  };

};


function asteroidFloat(asteroidPassed){
  asteroidPassed.body.velocity.x = randomNumberNeg(1, currentLevel.speed);
  asteroidPassed.body.velocity.y = randomNumberNeg(1, currentLevel.speed);
  asteroidPassed.body.angularVelocity = randomNumberNeg(1, currentLevel.speed);
};
