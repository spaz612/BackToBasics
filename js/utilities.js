function timeDrive(step,rpm){
  this.step = step;
  this.rpm = rpm;
  this.running = false;
  this.start = function(){
    if (!running) {
      running = true;
      this.context = setInterval(this.step,1000/this.rpm);
    }
  };
  this.halt = function(){
    if (running){
      running = false;
      clearInterval(this.context);
    }
  };
}

function makeToggle(){
  var green = true;
  var toggle = function(){
    green = !green;
    if (green){
      colorGreen("message");
    } else {
      colorRed("message");
    }
  };
  return toggle;
}

function colorGreen(target){
  $("#" + target).css("background-color", "green");
}

function colorRed(target){
  $("#" + target).css("background-color", "red");
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
  var drive = new timeDrive(makeToggle(),2);
  $(document).keydown(function()
    colorGreen("dpad-touch-target");
    drive.halt();
  });
  $(document).keyup(function(){
    colorRed("dpad-touch-target");
    drive.start();
  });
  $(document).keypress(function(event){
     displayKeypress(event.which);
  });
  loadXML();
  drive.start();
});
