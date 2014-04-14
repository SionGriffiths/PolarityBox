
// Main Game Class
var Game = function(){
    // Global settings & managers for data that all scenes can use
    this.Settings = null;
    this.SceneManager = null;
    this.InputManager = null;
    this.AudioManager = null;
    this.ImageManager = null;
    this.LevelManager = null;
    this.ScoreManager = null;
    this.LevelNumber = 0;
    this.PlayerName = null;
    this.PlayerScore = 0;
    this.NameEntered = false;


    var overlayCssSet = false;
    // Initialise the settings & managers
    this.Init = function (canvas, context) {
        // New up Managers
        this.Settings = new GlobalSettings();
        this.SceneManager = new SceneManager();
        this.InputManager = new InputManager();
        this.AudioManager = new AudioManager();
        this.ImageManager = new ImageManager();
        this.LevelManager = new LevelManager();
        this.ScoreManager = new ScoreManager();

        // Initialise settings
        this.SceneManager.Init(this);
        this.LevelManager.Init(this);
        this.ScoreManager.Init(this);
        this.InputManager.InitMouse(canvas);
        this.InputManager.InitKeyboard(document);
        this.Settings.Canvas = canvas;
        this.Settings.Context = context;

    };

    // Starts the game, and enters the game loop
    this.StartGame = function() {
        var self = this;

        // Load any assets needed at this stage
//        this.AudioManager.LoadAsync("Miku", "Assets/Sounds/BackgroundMusic.mp3", function() { self.AudioManager.Sounds["Miku"].play();});

        // Push the first scene to the manager
        this.SceneManager.Push(new Menu());

        // Set last update time
        this.Settings.LastUpdateTime = new Date().getTime();

        // Start game loop
        (function drawFrame(){
            window.requestAnimationFrame(drawFrame, self.Settings.Canvas);
            self.Update(new Date().getTime() - self.Settings.LastUpdateTime);
            self.Settings.LastUpdateTime = new Date().getTime();
        }());
    };

    // Update game frame, called from loop
    this.Update = function(delta) {
        this.Settings.Fps = (1 / delta) * 1000;
        this.SceneManager.Update(delta);
        this.SceneManager.Render();
    };

    this.SendToOverlay = function(message, canClick){
        if(!overlayCssSet) {
            document.getElementById("overlay").innerHTML = message;
            $('#overlay').show();

            var width = $('#overlay').width();
            var height = $('#overlay').height();

            var midX = this.Settings.Canvas.width/2;
            var midY = this.Settings.Canvas.height/2;

            midX -= width/2;
            midY -= height/2;
            if(canClick){
                $('#overlay').css("pointer-events" , "auto");
            }else{
                $('#overlay').css("pointer-events" , "none");
            }

            $('#overlay').css("top", midY);
            $('#overlay').css("left", midX);

            overlayCssSet = true;
        }
    };

    this.HideOverlay = function() {

        $('#overlay').hide();
        overlayCssSet = false;
    };
};