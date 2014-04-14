/**
 * Created by pooey on 13/04/2014.
 */

var ScoreManager = function(){

    var game;
    var localStore;
    var localScoreObject;
    var levelNumber;
    var scoreJSON;

    this.Init = function(gameRef){
        game = gameRef;
        localStore = window.localStorage;
        localScoreObject = localStore.getItem(levelNumber);

    };

    /**
     * @return {boolean}
     */
    this.CheckHighScore = function(){
        levelNumber = game.LevelNumber.toString();
        scoreJSON = JSON.parse(localStore.getItem(levelNumber));
        console.log("JSON SCORE : " + scoreJSON.highScore);
        console.log("Player SCORE : " + game.PlayerScore);

        return (game.PlayerScore > scoreJSON.highScore);

    };

    this.SetHighScore = function(){
        localStorage.setItem(levelNumber, this.StoreAsJSON());
    };

    this.StoreAsJSON = function(){
        return JSON.stringify({highScore : game.PlayerScore, name : game.PlayerName  });
    };

    this.InitScore = function(){
        levelNumber = game.LevelNumber.toString();
//        localScoreObject = localStore.getItem(levelNumber);
        if(localStore.getItem(levelNumber) == null){
            JSON.stringify({highScore : 0, name : 'player'});
            localStorage.setItem(levelNumber, JSON.stringify({highScore : 0, name : 'player'}) );
        }
    };
};

//localStorage.setItem(levelNumber, this.StoreAsJSON());