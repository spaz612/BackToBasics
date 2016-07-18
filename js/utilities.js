function timeDrive(step,rpm){
  this.step = step;
  this.rpm = rpm;
  this.running = false;
  this.start = function(){
    if (!this.running) {
      running = true;
      this.context = setInterval(this.step,1000/this.rpm);
    }
  };
  this.halt = function(){
    if (this.running){
      running = false;
      clearInterval(this.context);
    }
  };
}

function paintDriver(speed){
  this.run = speed;
  this.rise = speed;
  this.currentImage = 1;
  this.xVal = 240;
  this.yVal = 80;
  this.changeImage = function(newImage){
    this.currentImage = newImage;
  };
  this.paintFrame = function(){
    var cfx = document.getElementById("sprite-layer").getContext("2d");
    var sprites = document.getElementById("front-sprite");
    var xSpot = this.xVal;
    var ySpot = this.yVal;
    var runVal = this.run;
    var riseVal = this.rise;
    var paint = function(){
      cfx.fillStyle = "#FFFFFF";
      cfx.fillRect(0,0,640,480);
      xSpot += runVal;
      if(xSpot >= 576){
        runVal = -runVal;
        xSpot = 576 - (xSpot - 575);
      } else if (xSpot < 0){
        runVal = -runVal;
        xSpot = -xSpot;
      }
      ySpot += riseVal;
      if(ySpot >= 416){
        riseVal = -riseVal;
        ySpot = 416 - (ySpot - 415);
      } else if (ySpot < 0){
        riseVal = -riseVal;
        ySpot = -ySpot;
      }
      cfx.drawImage(sprites,0,0,64,64,xSpot,ySpot,64,64);
    };
    return paint;
  };
}
/*
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
}*/

function displayKey(code){
  $("#message").text("Display: " + code);
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
  var painter = new paintDriver(5);
  var drive = new timeDrive(painter.paintFrame(),50);
  $(document).keydown(function(event){
    displayKey(event.which);
    painter.changeImage(event.which);
  });
  loadXML();
  drive.start();
});
