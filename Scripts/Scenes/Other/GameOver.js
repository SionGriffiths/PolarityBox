
var GameOver = function(){

    var alpha;
    var game;

    this.Init = function(gameref){
        alpha = 0;
        game = gameref;
    };

    this.Update = function(){
        alpha++;
    };

    this.Render = function(){
        var context = game.Settings.Context;
        var canvas = game.Settings.Canvas;
        context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        context.fillRect(0,0, canvas.width, canvas.height);
    };

    this.onEnter = function(){
        console.log("game over entered");
    };

    this.HandleInputs = function(){};

    this.onPause = function (){};
    this.onResume= function (){};
    // When the state is unloaded
    this.onExit  = function (){

    };

};