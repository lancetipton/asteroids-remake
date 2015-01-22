

var socket = io();

function movePlayer(playerMovement){
  socket.emit("movePlayer", playerMovement);

}

function playerShoot(shootingPlayer){
  socket.emit("playerShoot", shootingPlayer);

}



// from server
socket.on('movePlayer', function(playerMovement){
  var player = findPlayer(playerMovement['id']);

  if(playerMovement['move'] == 'up'){
    player.moveShipUp();
  }
  else if(playerMovement['move'] == 'down'){
    player.moveShipDown();
  }
  else if(playerMovement['move'] == 'acceleration'){
    player.stopAcceleration();
  };

  if(playerMovement['move'] == 'left'){
    player.moveShipLeft();
  }
  else if(playerMovement['move'] == 'right'){
    player.moveShipRight();
  }
  else if(playerMovement['move'] == 'angular'){
    player.stopAngular();
  }

});

socket.on('playerShoot', function(shootingPlayer){
  var player = findPlayer(shootingPlayer['id']);

  if(shootingPlayer['fire'] == 'bullet'){
    player.fireBullet();
  }
  else if(shootingPlayer['fire'] == 'rocket'){
    player.fireRocket();
  }

});

function findPlayer(playerId){
  for(var i = 0; i < allPlayers.length; i++){
    if(allPlayers[i].id == playerId){
      return allPlayers[i];
    };
  };

}