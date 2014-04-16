/**
 * Created by pooey on 16/04/2014.
 */


var GameComplete = function(){

    var alpha;
    var game;
    var loaded = false;
    var music = false;
    this.Init = function(gameref){
        alpha = 0;
        game = gameref;
        var self = this;
        game.AudioManager.LoadAsync("circus", "Assets/Sounds/circus_b.ogg", function(){ self.loaded = true; } );
    };

    this.Update = function(){
        alpha+= 0.005;
        this.HandleInputs();
        if(!music) {
            this.playMenuMusic();
        }
    };

    this.Render = function(){
        var context = game.Settings.Context;
        var canvas = game.Settings.Canvas;
        context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        context.fillRect(0,0, canvas.width, canvas.height);
        game.SendToOverlay("<h1> YOU WIN </h1>");
    };

    this.onEnter = function(){

    };

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
    this.onExit  = function (){};

    this.playMenuMusic =  function(){
        if(loaded) {
            game.AudioManager.Sounds["circus"].play();
            console.log("Play the tunes");
            music = true;
        }
    };

};