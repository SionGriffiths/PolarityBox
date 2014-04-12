

var Level = function(){
    /* public variables */
    this.Name = null;
    this.MapManager = null;
    /* private variables */
    var game = null;
    var levelFile = null;

    this.player = null;
    var levelObjects = null;

    var levelInputHandler = null;

    /* public functions */

    // Initialise which level file to use
    this.Init = function (levelFileLocation){
        levelFile = levelFileLocation;

    };

    // When the Level is loaded
    this.onEnter = function (gameRef){
        game = gameRef;

        // Initialise Map Manager on Enter
        this.MapManager = new LevelMapManager();
        this.MapManager.Init(game);
        // Initialise Player
        this.player = new Player();
        this.player.Init(game, this);
        this.player.PlayerSettings(300,375,25);
        //Initialise input handling
        levelInputHandler = new LevelInputHandler();
        levelInputHandler.Init(this, game);
        /* Load any assets for the game */
        // Load Map
        this.MapManager.LoadMap(levelFile);

    };

    // When the Level is updated
    this.Update = function (delta) {
        if(this.AssetsLoaded()){
            levelInputHandler.HandleInputs();
            this.MapManager.Map.Update();
            this.player.Update(delta);
        }
    };

    // When the Level is rendered (call after the update function)
    this.Render  = function () {
        if(this.AssetsLoaded()){
            this.MapManager.Map.Draw();
            this.player.Draw();
        }
    };



    // Pause and unpause
    // TODO: Write Pause and Unpause methods
    this.onPause = function (){};
    this.onResume= function (){};

    // When the Level is unloaded
    this.onExit  = function (){};

    /* private functions */

    // Check to see if assets are loaded
    this.AssetsLoaded = function(){
       return (this.MapManager.Loaded && this.player.Loaded);
    };
};