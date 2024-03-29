
var GameOver = function(){

    var alpha;
    var game;

    this.Init = function(gameref){
        alpha = 0;
        game = gameref;
    };

    this.Update = function(){
        alpha+= 0.005;
        this.HandleInputs();
    };

    this.Render = function(){
        var context = game.Settings.Context;
        var canvas = game.Settings.Canvas;
        context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        context.fillRect(0,0, canvas.width, canvas.height);
        game.SendToOverlay("<h1> GAME OVER </h1> <h3>Click to return to menu</h3>");
    };

    this.onEnter = function(){};

    this.HandleInputs = function(){
        var buttons = game.InputManager.mouseButtons;
        if(!($.inArray(1, buttons) == -1)){
            game.Settings.playerLives = 10;
            game.SceneManager.Push(new Menu());
        }
    };

    this.onPause = function (){};
    this.onResume= function (){};
    // When the state is unloaded
    this.onExit  = function (){

    };

};