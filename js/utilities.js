function timeDrive(step,rpm){
  this.step = step;
  this.rpm = rpm;
  this.start = function(){
    this.context = setInterval(this.step,1000/this.rpm);
  };
  this.halt = function(){
    clearInterval(this.context);
  };
}

function makeToggle(){
  var count = 0;
  function toggle(){
    count++ %= 2;
    if (count == 0){
      colorGreen();
    } else {
      colorRed();
    }
  }
  return toggle;
}

function colorGreen(){
  $("#dpad-touch-target").css("background-color", "green");
}

function colorRed(){
  $("#dpad-touch-target").css("background-color", "red");
}

function displayKeypress(code){
  $("#message").text("Display: " + code);
  var ctx=document.getElementById("monitor").getContext("2d");
//  var ctx = $("#monitor").getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Code: " + code,80,60);
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
//  var drive = new timeDrive(makeToggle(),2);
  $(document).keydown(colorGreen);
  $(document).keyup(colorRed);
  $(document).keypress(function(event){
     displayKeypress(event.which);
  });
  loadXML();
//  drive.start();
});
