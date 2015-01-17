function getPlayerFromServer(){
// ajax call here...
console.log('getting the player...');

  $.ajax({
    url:'http://localhost:3000/players',
    type: 'get',
  }).done(function(data){
    console.log(data)
  }).fail(function(data){
    console.log('failed to get the player!');
  });

}


function tellServerToUpdatePoints(){
// ajax call here...


}
