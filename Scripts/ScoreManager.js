/**
 * Created by pooey on 13/04/2014.
 */

var ScoreManager = function(){



    var game;
    var localStore;
    var levelNumber;

    this.Init = function(gameRef){
        game = gameRef;
        localStore = window.localStorage;
    };

    this.CheckHighScore = function(){
        levelNumber = game.LevelNumber.toString();
        var scoreJSON;
        if(localStore.getItem(levelNumber) != null){
            var temp = localStore.getItem(levelNumber);
            scoreJSON = JSON.parse(temp);
            if(game.PlayerScore > scoreJSON.highScore){
                console.log(this.StoreAsJSON());
                localStorage.setItem(levelNumber, this.StoreAsJSON());
            }
        }else{
            console.log("New score from null " + game.PlayerName + game.PlayerScore);
            localStorage.setItem(levelNumber, this.StoreAsJSON());
        }
    };

    this.StoreAsJSON = function(){
        return JSON.stringify({highScore : game.PlayerScore, name : game.PlayerName  });
    };

}

//localStorage.setItem(levelNumber, this.StoreAsJSON());