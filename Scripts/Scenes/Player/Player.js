
var Player = function(){

    /* public variables */
    this.X = 0;
    this.Y = 0;
    this.Size = 0;
    this.Colour = "#FFFFFF";


    // Image Frame that needs to be drawn
    this.PlayerImageFrame = 0;

    // player rotation
    this.Rotation = 0;
    // player status
    this.Status = "Alive";

    // is loaded
    this.Loaded = false;

    // Starting velocities
    this.VelocityX = 0;
    this.VelocityY = 0;

    this.Ready = false;
    /* private variables */

    // Jumping Vars
    var jumping = false;
    var jumpSpeed = 3;



    // Handles the Animation
    var playerAnimationHandler = null;

    //Handles player collision
    var playerCollisionHandler = null;

    // Reference to parents
    var game = null;
    var level = null;

    // image settings for draw
    var playerImageHeight = 72;
    var playerImageWidth = 78;


    /* public functions */

    this.Init = function(gameRef, levelRef){
        game = gameRef;
        level = levelRef;
        playerAnimationHandler = new PlayerAnimationHandler();
        playerAnimationHandler.Init(this);
        playerCollisionHandler = new PlayerCollisionHandler();
        playerCollisionHandler.Init(this, level);
        var self = this;
        game.AudioManager.LoadAsync("JumpSound", "Assets/Sounds/jump2.ogg", false); // Might want to add a callback!
        game.AudioManager.LoadAsync("DeathSound", "Assets/Sounds/death.ogg", false);
        game.ImageManager.LoadAsync("PlayerImage", "Assets/Images/PlayerSprite.png", function(){ self.Loaded = true; });


    };

    this.PlayerSettings = function(x, y, size){
        this.X = x;
        this.Y = y;
        this.Size = size;
    };

    // Update player
    this.Update = function(delta) {
        // Update players location based on inputs and gravity
        if (this.Status == "Alive") {

            this.VelocityY += game.Settings.Gravity;
            this.Y += this.VelocityY;
            this.X += this.VelocityX;

            // Stop the player going out of the canvas
            if (this.X > game.Settings.Canvas.width - this.Size) {
                this.X = game.Settings.Canvas.width - this.Size;
            }
            if (this.X < 0) {
                this.X = 0;
            }

            if (this.Y > game.Settings.Canvas.height) {
                this.Die();
            }
        }

        playerCollisionHandler.Update();
        // Update Animations

    };

    // Draw player
    this.Draw = function(){
        // Game context savez
        game.Settings.Context.save();

        if(this.Status == "Alive") {
            // Translate to play coordinates
            game.Settings.Context.translate(this.X, this.Y);

            // Apply Rotation - Translate to mid player and rotate
            game.Settings.Context.translate(this.Size / 2 , this.Size / 2);
            game.Settings.Context.rotate(this.Rotation);

            // Translate back to X,Y
            game.Settings.Context.translate(-this.Size / 2 , -this.Size / 2);

            // Draw Player
            game.Settings.Context.drawImage(
                game.ImageManager.Images["PlayerImage"],
                    this.PlayerImageFrame * playerImageWidth,
                0,
                playerImageWidth,
                playerImageHeight,
                0,
                0,
                this.Size,
                this.Size);
        }

        playerAnimationHandler.Update();
        // Game context restore
        game.Settings.Context.restore();

    };

    // Swap player colour
    this.ChangeColour = function(){
        playerAnimationHandler.ColourTransition(Date.now());
    };

    // Jump -- Duh.
    this.Jump = function(){
        if (!jumping) {
//            game.AudioManager.Sounds["JumpSound"].play();
            this.VelocityY =- jumpSpeed*2;
            jumping = true;
            playerAnimationHandler.FlipTransition();
        }
    };

    this.Die = function(){

        if(this.Status == "Alive") {
            game.Settings.playerLives--;
            level.playerScore -= level.MapManager.Map.LevelEndX;
            this.Status = "Dying";
            var emitter = new Emitter(this.X, this.Y, this.Colour, game);
            var timeOfDeath = Date.now();
            playerAnimationHandler.DeathTransition(emitter, timeOfDeath);
            game.AudioManager.Sounds["DeathSound"].play();

        }
    };

    this.Rect = function(){
        return {X: this.X , Y: this.Y, W: this.Size, H: this.Size, C: this.Colour };
    };

    this.SetOnFloor = function(floorHeight){

        this.Y = floorHeight;
        this.VelocityY = 0;
        jumping = false;
    };

    /* private functions */
};