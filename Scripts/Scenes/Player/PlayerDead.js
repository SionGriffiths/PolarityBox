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
        if(clicked){
            game.LevelManager.LoadLevel(game.LevelNumber);
        }
    };

    this.Render = function(){
        context.fillStyle = "#FFF";
        context.font = "24pt Roboto";
        context.fillText(message, game.Settings.Canvas.width/2, game.Settings.Canvas.height/2);
        context.font = "18pt Roboto";
        context.fillText("Click to retry", game.Settings.Canvas.width/2, game.Settings.Canvas.height/2+36);

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

}