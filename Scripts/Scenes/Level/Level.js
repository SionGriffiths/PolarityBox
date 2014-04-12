

var Level = function(){
    /* public variables */
    this.Name = null;
    this.MapManager = null;
    /* private variables */
    var game = null;
    var levelFile = null;

    var player = null;
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
        player = new Player();
        player.Init(game, this);
        player.PlayerSettings(300,300,25);

        /* Load any assets for the game */
        // Load Map
        this.MapManager.LoadMap(levelFile);

    };

    // When the Level is updated
    this.Update = function (delta) {
        if(this.AssetsLoaded()){
            this.MapManager.Map.Update();
            player.Update(delta);
        }
    };

    // When the Level is rendered (call after the update function)
    this.Render  = function () {
        if(this.AssetsLoaded()){
            this.MapManager.Map.Draw();
            player.Draw();
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
       return (this.MapManager.Loaded && player.Loaded);
    };
};