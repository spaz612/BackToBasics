function colorGreen(){
  $("#dpad-touch-target").css("background-color", "green");
}

function colorRed(){
  $("#dpad-touch-target").css("background-color", "red");
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
  loadXML();
});
