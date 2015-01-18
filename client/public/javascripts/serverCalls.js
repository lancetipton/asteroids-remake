function getPlayerFromServer(name, password){
// ajax call here...
console.log('getting the player...');

  $.ajax({
    url:'http://localhost:3000/players',
    type: 'get',
    data: {name: name, password: password, game: 'Asteroid'},
  }).done(function(data){
    player = data['player']
    asteroidGame = data['games'][0]

    setPlayer();


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
    asteroidGame = data['games'][0]

    setPlayer();

  }).fail(function(data){
    console.log('failed to create new player!');
  });
}

function setPlayer(){
    playerTemplate['name'] = player['name']
    console.log(playerTemplate['name'])
    playerTemplate['id'] = player['id']
    playerTemplate['points'] = asteroidGame['score']
    $('#connect').hide();
}



