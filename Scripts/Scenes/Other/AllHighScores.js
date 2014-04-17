/**
 * Created by pooey on 16/04/2014.
 */



var AllHighScores = function(){


    var game;
    var scoreList = [];
    var displayScore = [];
    var sceneTime = 0;


    this.Init = function(gameref, list){
        game = gameref;
        scoreList = list;
    };

    this.Update = function(delta){
        sceneTime += delta;
        if(sceneTime > 300) {
            this.HandleInputs();
        }

    };

    this.Render = function(){
        var context = game.Settings.Context;
        var canvas = game.Settings.Canvas;
        context.drawImage(game.ImageManager.Images["MenuBackground"], 0, 0, game.Settings.Canvas.width, game.Settings.Canvas.height);
        this.DisplayScores();
    };

    this.onEnter = function(){
        this.getScores();
    };

    this.HandleInputs = function(){
        var buttons = game.InputManager.mouseButtons;
        if(!($.inArray(1, buttons) == -1)){
//            game.SceneManager.Push(new Menu());

            game.LevelManager.SwitchScene(new Menu());
        }
    };

    this.onPause = function (){};
    this.onResume= function (){};
    // When the state is unloaded
    this.onExit  = function (){

    };

    this.getScores = function(){

        var noScore = {name : " --- " , score : 0};

        for(var index = 0; index < 5; index++){

            if(scoreList[index] == null){
                displayScore.push(noScore);
            }else{
                var scoreJSON = JSON.parse(scoreList[index]);
                var score = {name : scoreJSON.name, score : scoreJSON.highScore};
                displayScore.push(score);
            }
        }

    };

    this.DisplayScores = function(){
        game.SendToOverlay("<h2> High Scores</h2>"
            +"<table>"
            + "<tr>"
            + " <th>Level </th>"
            + " <th>Player </th>"
            + "<th>Score</th>"
            +" </tr>"
            +    "<tr>"
            +   "<td>1</td>"
            +   "<td>" + displayScore[0].name + "</td>"
            +  "<td>" + displayScore[0].score + "</td>"
            + "</tr>"
            + "<tr>"
            +   "<td>2</td>"
            +   "<td>" + displayScore[1].name + "</td>"
            + "<td>" + displayScore[1].score + "</td>"
            + "</tr>"
            +"<tr>"
            +"<td>3</td>"
            +"<td>" + displayScore[2].name + "</td>"
            +"<td>" + displayScore[2].score + "</td>"
            +"</tr>"
            + "<tr>"
            +    "<td>4</td>"
            +   "<td>" + displayScore[3].name + "</td>"
            +   "<td>" + displayScore[3].score + "</td>"
            + "</tr>"
            + "<tr>"
            +    "<td>5</td>"
            +   "<td>" + displayScore[4].name + "</td>"
            +   "<td>" + displayScore[4].score + "</td>"
            + "</tr>"
            + "</table>"
        +"<p> Click to return to the menu</p>");
    };

};

//+ "<h3> Level 1   " + displayScore[0].name + " : " + displayScore[0].score + " points </h3>"
//            + "<h3> Level 2   " + displayScore[1].name + " : " + displayScore[1].score + " points </h3>"
//            + "<h3> Level 3   " + displayScore[2].name + " : " + displayScore[2].score + " points </h3>"
//            + "<h3> Level 4   " + displayScore[3].name + " : " + displayScore[3].score + " points </h3>"
//            + "<h3> Level 5   " + displayScore[4].name + " : " + displayScore[4].score + " points </h3>"
//            +"</br> <p>Click to return to the menu</p>"