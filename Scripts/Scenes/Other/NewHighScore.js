/**
 * Created by pooey on 14/04/2014.
 */

var NewHighScore =  function(){

    var game;
    var endOflevel;

    this.Init = function(gameref, endOfLevel){
        game = gameref;
        endOflevel = endOfLevel;
    };

    this.Update = function(){

        if(game.NameEntered) {
            console.log('Button clicked');
            game.ScoreManager.SetHighScore();
            game.HideOverlay();
            if (game.Settings.playerLives > 0) {
                if (endOflevel) {
                    game.LevelNumber++;
                }
                game.LevelManager.LoadLevel(game.LevelNumber);
                game.NameEntered = false;
            }else{
                game.SceneManager.Pop();
            }
        }
    };

    this.Render = function(){
    };

    this.onEnter = function(){
        console.log("enter score scene");
        game.SendToOverlay($('#highScore').html(), true);
    };

    this.HandleInputs = function(){

    };

    this.onPause = function (){};
    this.onResume= function (){};

    // When the state is unloaded
    this.onExit  = function (){

    }


};