

var Level = function(){
    /* public variables */
    this.Name = null;
    this.MapManager = null;
    this.player = null;

    /* private variables */
    var game = null;
    var levelFile = null;
    var levelInputHandler = null;
    var levelTime = null;
    var hud = null;

    /* public functions */

    // Initialise which level file to use
    this.Init = function (levelFileLocation){
        levelFile = levelFileLocation;

    };

    // When the Level is loaded
    this.onEnter = function (gameRef){

        game = gameRef;
        game.AudioManager.StopAll();
        game.PlayerScore = 0;
        levelTime = 0;
        // Initialise Map Manager on Enter
        this.MapManager = new LevelMapManager();
        this.MapManager.Init(game);
        // Initialise Player
        this.player = new Player();
        this.player.Init(game, this);
        this.player.PlayerSettings(300,375,25);
        hud = new Hud();
        hud.Init(game, this);

        //Initialise input handling
        levelInputHandler = new LevelInputHandler();
        levelInputHandler.Init(this, game);
        /* Load any assets for the game */
        // Load Map
        this.MapManager.LoadMap(levelFile);
    };

    // When the Level is updated
    this.Update = function (delta) {
        document.getElementById("debug2").innerHTML = Math.floor(game.Settings.Fps) + "</br>";
        levelTime += delta;
        if(this.AssetsLoaded()) {
            if (levelTime > 200) {
                levelInputHandler.HandleInputs();
                if (this.player.Ready && this.player.Status == "Alive") {
                    this.MapManager.Map.Update();
                    this.player.Update(delta);
                    game.PlayerScore = this.MapManager.Map.MapCanvasLocation;
                    hud.Update();

                }
//                if(this.MapManager.Loaded){
//                    game.AudioManager.Sounds["levelMusic"].play();
//                }
                if(this.player.Status == "Dead"){
                    if(game.ScoreManager.CheckHighScore()){
                        var scoreScene = new NewHighScore();
                        scoreScene.Init(game, false);
                        game.SceneManager.Push(scoreScene);
                    }else {
                        var deathScene = new PlayerDead();
                        deathScene.Init(this, game, "You Died!");
                        game.SceneManager.Push(deathScene);
                    }
                }

            }
        }

    };

    // When the Level is rendered (call after the update function)
    this.Render  = function () {
        if(this.AssetsLoaded()){
            this.MapManager.Map.Draw();
            this.player.Draw();
            hud.Draw();
        }
        if(!this.player.Ready){
           game.SendToOverlay("<h2>Click to begin</h2>", false);
        }
    };

    this.FinishedLevel = function(){
        if(game.ScoreManager.CheckHighScore()){
            var scoreScene = new NewHighScore();
            scoreScene.Init(game, true);
            game.SceneManager.Push(scoreScene);
        }else{
            game.LevelNumber++;
            game.LevelManager.LoadLevel(game.LevelNumber);
        }
    };

    // Pause and unpause
    // TODO: Write Pause and Unpause methods
    this.onPause = function (){};
    this.onResume= function (){};

    // When the Level is unloaded
    this.onExit  = function (){};



    // Check to see if assets are loaded
    this.AssetsLoaded = function(){
        return (this.MapManager.Loaded && this.player.Loaded);
    };
};