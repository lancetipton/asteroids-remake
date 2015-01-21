var player, newGame;

function getPlayerFromServer(name, password){
// ajax call here...
console.log('getting the player...');

  $.ajax({
    url:'http://localhost:3000/players',
    type: 'get',
    data: {name: name, password: password, game: 'Asteroid'},
  }).done(function(data){
    console.log('Player found, setting game!')
    player = data['player']
    newGame = data['games'][0]
    setPlayer(player, newGame);


  }).fail(function(data){
    console.log('failed to get the player!');
  });

}


function createNewPlayerOnServer(name, password){
  $.ajax({
    url:'http://localhost:3000/players',
    type: 'post',
    data: {name: name, password: password, game: 'Asteroid'},
  }).done(function(data){

    player = data['player']
    newGame = data['games'][0]

    setPlayer(player, newGame);

  }).fail(function(data){
    console.log('failed to create new player!');
  });
}

function updatePlayerScoreOnServer(scoreToPass){
  console.log(scoreToPass);

  $.ajax({
    url:'http://localhost:3000/games/' + newGame.id,
    type: 'put',
    data: {score: scoreToPass},
  }).done(function(data){

    // totalScore = data['game']['score'];
    playerTemplate['points'] = data['game']['score'];
    console.log('Score has been updated to: ' + playerTemplate['points']);

  }).fail(function(data){
    console.log('failed to update Score!');
  });


};




function setPlayer(player, newGame){
    playerTemplate['name'] = player['name']
    playerTemplate['id'] = player['id']
    playerTemplate['points'] = newGame['score']
    $('#connect').hide();
      $('#gameDiv').show();
}




