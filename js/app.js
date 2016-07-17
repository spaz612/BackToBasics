function displayControl(paint,frames){
  this.paintFrame = paint;
  this.fps = frames;
  this.start = function(){
    this.context = setInterval(this.paintFrame,1000/this.fps);
  };
  this.halt = function(){
    clearInterval(this.context);
  }
};

App = {};
