

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
        levelTime += delta;
        if(this.AssetsLoaded()) {
            if (levelTime > 200) {
                levelInputHandler.HandleInputs();
                if (this.player.Ready && this.player.Status == "Alive") {
                    this.MapManager.Map.Update();
                    this.player.Update(delta);
                    game.PlayerScore = this.MapManager.Map.MapCanvasLocation;
                    hud.Update();
                    this.SetNotification();
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
            if(!this.player.Ready){
                game.SendToOverlay("<h2>Level "+ game.LevelNumber + "</h2><h3>Click to begin</h3>", false);
                this.HideNotification();
            }
            this.MapManager.Map.Draw();
            this.player.Draw();
            hud.Draw();

        }else{
            this.ShowNotification("<h2>Level "+ game.LevelNumber + "</h2><h3>Loading</h3>");
            game.Settings.Context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
            game.Settings.Context.fillRect(0,0, game.Settings.Canvas.width, game.Settings.Canvas.height);
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

    this.SetNotification = function(){
        for(var index = 0; index < this.MapManager.Map.NotificationList.length; index++){
            var notify = this.MapManager.Map.NotificationList[index];

            if(this.MapManager.Map.MapCanvasLocation == notify.X){
                this.ShowNotification(notify.Message);
            }
            if(this.MapManager.Map.MapCanvasLocation == notify.End || this.player.Status != "Alive"){
                this.HideNotification();
            }
        }
    };

    this.ShowNotification = function(message){
        document.getElementById("notify").innerHTML = message;

        var width = $('#notify').width();
        var midX = game.Settings.Canvas.width/2;
        midX -= width/2;
        $('#notify').css("left", midX);
        $('#notify').show();
    }

    this.HideNotification = function(){
        $('#notify').hide();
    };



};