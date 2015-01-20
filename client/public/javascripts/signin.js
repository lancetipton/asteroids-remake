$( document ).ready(function() {

  $("#leaders").hide();

  $('#logInBtn').on('click', function(event) {

    event.preventDefault();


    var name = $('#userName').val();
    var password = $('#password').val();
    getPlayerFromServer(name, password)


  });


  $('#signInBtn').on('click', function(event) {

    event.preventDefault();

    var name = $('#newName').val();
    var password = $('#newPassword').val();
    createNewPlayerOnServer(name, password)

  });

  $('#leadersBtn').on('click', function(){
    $("#leaders").show();
  });


  $("#leaders").on('click', function(){
    $("#leaders").hide();
    $('#connect').show();
  });



});



