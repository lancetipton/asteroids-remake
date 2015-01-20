allItems = ['rocket'];


var rocket = {
  type: 'rocket',
  speed: 200,
  killItem: 3000,
  itemHitPoints: 200,
};

function buildItems(type){
  items = game.add.group();
  items.enableBody = true;
  game.physics.enable(items, Phaser.Physics.ARCADE);
  items.setAll('anchor.x', 0.5);
  items.setAll('anchor.y', 0.5);

  var item = ''
  // put a random number in here to make it pick a random number
  var sprite = allItems[0]

  item = items.create(randomNumberPos(0, 750), randomNumberPos(0, 500), sprite);
  item.enableBody = true;
  setUpItem(item, type);
};

// add these attr to the item:
function setUpItem(item, type){
  if(type == 'rocket'){
    item.type = rocket['type'];
    item.speed = rocket['speed'];
    item.killItem = rocket['killItem'];
    item.itemHitPoints = rocket['itemHitPoints'];
  };
}



