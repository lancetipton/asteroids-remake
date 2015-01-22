$( document ).ready(function() {

  $("#leaders").hide();
  $('#gameDiv').hide();

  $('#logInBtn').click(function(event) {

    event.preventDefault();

    var name = $('#userName').val();
    var password = $('#password').val();
    getPlayerFromServer(name, password)


  });

  $('#playBtn').on('click', function(event) {

    event.preventDefault();

    var player = {name: 'Player 1', id: 0}
    var newGame = {score: 0};

    setPlayer(player, newGame);

  });



  $('#signInBtn').on('click', function(event) {

    event.preventDefault();

    var name = $('#newName').val();
    var password = $('#newPassword').val();
    createNewPlayerOnServer(name, password)

  });

  $('#leadersBtn').on('click', function(){
    $("#leaders").show();
    $('#connect').hide();
  });


  $("#leaders").on('click', function(){
    $("#leaders").hide();
    $('#connect').show();
  });



});



