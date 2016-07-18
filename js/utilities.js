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
  this.run = 4*speed;
  this.rise = 3*speed;
  this.currentImage = 1;
  this.xVal = 240;
  this.yVal = 80;
  this.changeImage = function(newImage){
    this.currentImage = newImage;
  };
  this.paintFrame = function(){
    var paint = function(){
      var cfx = document.getElementById("sprite-layer").getContext("2d");
      var sprites = document.getElementById("front-sprite");
      cfx.fillStyle = "#FFFFFF";
      cfx.fillRect(0,0,640,480);
      this.xVal = this.xVal + this.run;
      if(this.xVal >= 640){
        this.run = -this.run;
        this.xVal = 640 - (this.xVal - 639);
      }
      this.yVal += this.rise;
      if(this.yVal >= 480){
        this.rise = -this.rise;
        this.yVal = 480 - (this.yVal - 479);
      }
      cfx.drawImage(sprites,((this.currentImage-1)%16)*64,Math.floor((this.currentImage-1)/16),64,64,this.xVal,this.yVal,64,64);
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
  var drive = new timeDrive(painter.paintFrame(),2);
  $(document).keydown(function(event){
    displayKey(event.which);
    painter.changeImage(event.which);
  });
  loadXML();
  drive.start();
});
