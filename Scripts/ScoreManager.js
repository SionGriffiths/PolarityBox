/**
 * Created by pooey on 13/04/2014.
 */

var ScoreManager = function(){

    this.Score = 0;
    this.PlayerName = null;

    var game;
    var localScore;
    var localStorage;
    var level;

    this.Init = function(gameRef){
      game = gameRef;
        localStorage = window.localStorage;
    };

    this.CheckHighScore = function(){
        level = game.LevelNumber.toString();
        localScore = parseInt(localStorage.getItem(level));
        if(this.Score > localScore){
            localStorage.setItem(level, this.Score);
            localStorage.setItem(level, this.PlayerName);
        }
    };




}