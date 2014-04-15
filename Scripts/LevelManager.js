

var LevelManager = function(){
    /* private variables */
    var game = null;

    this.Init = function(gameRef){
      game = gameRef;
    };

    this.LoadLevel = function(levelnumber){
        game.ScoreManager.InitScore();
        var level = new Level();
        switch (levelnumber){
            case 1:
                console.log("Loading Level 1");
                level.Init("Assets/Maps/Level1.json");
                this.SwitchScene(level);
                break;
            case 2:
                console.log("Loading Level 2");
                level.Init("Assets/Maps/Level2.json");
                this.SwitchScene(level);
                break;
            case 3:
                console.log("Loading Level 3");
                level.Init("Assets/Maps/Level3.json");
                this.SwitchScene(level);
                break;
            case 4:
                console.log("Loading Level 4");
                level.Init("Assets/Maps/Level4.json");
                this.SwitchScene(level);
                break;
            default:
                console.log("Error Level" + levelnumber + " Not Defined");
                break;
        }

    };

    this.SwitchScene = function(level){
        game.AudioManager.StopAll();
        game.SceneManager.Pop();
        game.SceneManager.Push(level);
    };
};