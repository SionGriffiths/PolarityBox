

var LevelManager = function(){
    /* private variables */
    var game = null;

    this.Init = function(gameRef){
      game = gameRef;
    };

    this.LoadLevel = function(levelnumber){
        switch (levelnumber){
            case 1:
                console.log("Loading Level 1");
                var level = new Level();
                level.Init("Assets/Maps/Level1.json");
                game.AudioManager.StopAll();
                game.SceneManager.Pop();
                game.SceneManager.Push(level);
                break;
            case 2:
                console.log("Loading Level 2");
                var level = new Level();
                level.Init("Assets/Maps/Level2.json");
                game.AudioManager.StopAll();
                game.SceneManager.Pop();
                game.SceneManager.Push(level);
                break;
            default:
                console.log("Error Level" + levelnumber + " Not Defined");
                break;
        }
    };
};