function colorGreen(){
  $("#dpad-touch-target").css("background-color", "green");
}

function colorRed(){
  $("#dpad-touch-target").css("background-color", "red");
}

function displayKeypress(code){
  $("#message").text("Display: " + code);
  var ctx = $("#monitor").getContext("2d");
  ctx.fillRect(20,20,150,100);
//  ctx.font = "30px Arial";
//  ctx.fillText("Code: " + code,80,60);
}

function loadXML(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      $("#message").text(xmlhttp.responseText);
    }  
  };
  xmlhttp.open("GET","xml/data.xml",true);
  xmlhttp.send();
}

$(document).ready(function(){
  $(document).keydown(colorGreen);
  $(document).keyup(colorRed);
  $(document).keypress(function(event){
     displayKeypress(event.which);
  });
  loadXML();
});
