/**
 * Created by pooey on 13/04/2014.
 */


var PlayerDead = function(){

    var level;
    var game;
    var message;
    var context;
    var clicked;

    this.Init = function(levelref, gameRef, messageIn){
        level = levelref;
        game = gameRef;
        context = game.Settings.Context;
        message = messageIn;
    };

    this.Update = function(){
        this.HandleInputs();
        if(game.Settings.playerLives > 0) {
            game.SendToOverlay("<h2>You Died!</h2>  <h3>Click to retry</h3>", false);
            if (clicked) {
                game.LevelManager.LoadLevel(game.LevelNumber);
                game.HideOverlay();
            }
        }else{
            var gameOver = new GameOver();
            gameOver.Init(game);
            game.SceneManager.Push(gameOver);
        }
    };

    this.Render = function(){
    };

    this.onEnter = function(){

    };

    this.HandleInputs = function(){
        var buttons = game.InputManager.mouseButtons;
        if(!($.inArray(1, buttons) == -1)){ // Left Click
            clicked = true;
        }
    };

    this.onPause = function (){};
    this.onResume= function (){};
    // When the state is unloaded
    this.onExit  = function (){

    };

};