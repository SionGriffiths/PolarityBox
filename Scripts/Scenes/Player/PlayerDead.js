/**
 * Created by pooey on 13/04/2014.
 */


var PlayerDead = function(){

    var level;
    var game;
    var message;
    var context;

    this.Init = function(levelref, gameRef, messageIn){
        level = levelref;
        game = gameRef;
        context = game.Settings.Context;
        message = messageIn;
    };

    this.Update = function(){

    };

    this.Render = function(){
        context.fillStyle = "#FFF";
        context.font = "24pt Courier";
        context.fillText(message, game.Settings.Canvas.width/2, game.Settings.Canvas.height/2);
    };

    this.onEnter = function(){

    };

    this.onPause = function (){};
    this.onResume= function (){};
    // When the state is unloaded
    this.onExit  = function (){};

}