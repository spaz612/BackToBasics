function colorGreen(){
  $(#dpad-touch-target).css("background-color: green");
}

function colorRed(){
  $(#dpad-touch-target).css("background-color: red");
}

$(document).ready(function(){
  $(document).keydown(colorGreen);
  $(document).keyup(colorRed);
});
