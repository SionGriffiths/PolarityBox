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

    this.CheckHighScore = function(){
        levelNumber = game.LevelNumber.toString();
        scoreJSON = JSON.parse(localStore.getItem(levelNumber));
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

        if(localStore.getItem(levelNumber) == null){
            JSON.stringify({highScore : 0, name : 'player'});
            localStorage.setItem(levelNumber, JSON.stringify({highScore : 0, name : 'player'}) );
        }
    };

    this.GetAllScores = function(){
        var scoreList = [];
        for(var index = 1; index <= 5; index++){
            var score = localStore.getItem(index);
                scoreList.push(score);
        }
        return scoreList;
    }
};

