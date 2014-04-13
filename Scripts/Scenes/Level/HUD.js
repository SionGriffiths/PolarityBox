/**
 * Created by pooey on 12/04/2014.
 */

var Hud = function(){

    this.playerLives = null;
    this.playerScore = null;

    var context;
    var game;
    var level;
    this.Init = function(gameRef, levelRef){
        game = gameRef;
        level = levelRef;
        context = game.Settings.Context;

        this.playerScore = 0;
    };

    this.Update = function(){
        this.playerScore = level.playerScore;
    };

    this.Draw = function(){
        context.fillStyle = "#FFF";
        context.font = "12pt Helvetica";
        context.fillText("Lives : " + game.Settings.playerLives, 50, 15);
        context.fillText("Score : " + this.playerScore, game.Settings.Canvas.width-100, 15);
    };


}