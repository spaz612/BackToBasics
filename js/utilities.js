function timeDrive(step,rpm){
  this.step = step;
  this.rpm = rpm;
  this.start = function(){
    this.context = setInterval(this.step,1000/this.rpm);
  };
  this.halt = function(){
    clearInterval(this.context);
  }
};

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
  $(document).keydown(colorGreen);
  $(document).keyup(colorRed);
  loadXML();
  drive.start();
});
