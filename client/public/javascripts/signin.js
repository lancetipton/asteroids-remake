$( document ).ready(function() {

  $('#logIn').submit(function(event) {

    event.preventDefault();

    var name = $('#userName').val();
    var password = $('#password').val();
    getPlayerFromServer(name, password)

  });


  $('#signIn').submit(function(event) {

    event.preventDefault();

    var name = $('#newName').val();
    var password = $('#newPassword').val();
    createNewPlayerOnServer(name, password)

  });



});



