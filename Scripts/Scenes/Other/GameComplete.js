/**
 * Created by pooey on 16/04/2014.
 */


var GameComplete = function(){

    var alpha;
    var game;
    var loaded = false;
    var music = false;
    var sceneTime = 0;
    this.Init = function(gameref){
        alpha = 0;
        game = gameref;
        game.AudioManager.LoadAsync("circus", "Assets/Sounds/circus_b.mp3", function(){ loaded = true; } );
    };

    this.Update = function(delta){
        alpha+= 0.005;
        sceneTime += delta;
        if(sceneTime > 300) {
            this.HandleInputs();
            if (!music) {
                this.playMenuMusic();
            }
        }
    };

    this.Render = function(){
        var context = game.Settings.Context;
        var canvas = game.Settings.Canvas;
        context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        context.fillRect(0,0, canvas.width, canvas.height);
        game.SendToOverlay("<h1> YOU WIN </h1> <h3> Click to return to the menu </h3>");
    };

    this.onEnter = function(){

    };

    this.HandleInputs = function(){
        var buttons = game.InputManager.mouseButtons;
        if(!($.inArray(1, buttons) == -1)){
            game.Settings.playerLives = 10;
            game.LevelManager.SwitchScene(new Menu());
        }
    };

    this.onPause = function (){};
    this.onResume= function (){};
    // When the state is unloaded
    this.onExit  = function (){};

    this.playMenuMusic =  function(){
        if(loaded) {
            game.AudioManager.Sounds["circus"].play();
            music = true;
        }
    };

};