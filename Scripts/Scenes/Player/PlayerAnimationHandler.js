

var PlayerAnimationHandler = function(){

    /* public variables */

    /* private variables */
    var player = null;
    var game;
    var playerAnimationHandler = null;
    var animatingColourTransition = false;
    var animatingFlipTransition = false;
    var animatingDeathTransition = false;
    var rotationSpeed = 4;
    var deathEmitter = null;
    var timeOfDeath = null;
    var lastFlipTime = 0;

    /* public functions */

    this.Init = function(playerRef, gameref){
        player = playerRef;
        game = gameref;

    };


    this.Update = function(){
        if(animatingDeathTransition) {
            UpdateDeathTransition();
        }else {
            if (animatingColourTransition) {
                UpdateColourTransition(player);
            }
            if (animatingFlipTransition){
                UpdateFlipTransition(player);
            }
        }
    };

    //Allow colour change - only ever 200ms
    this.ColourTransition = function(flipTime){
        if(flipTime - lastFlipTime > 200) {
            animatingColourTransition = true;
            lastFlipTime = Date.now();
            if(game.AudioManager.Sounds["switch"].paused && game.AudioManager.Sounds["switch"].duration > 0) {
                if (window.chrome) {
                    game.AudioManager.LoadAsync("switch", "Assets/Sounds/swish.wav", false);
                }
                game.AudioManager.Sounds["switch"].play();
            }else{
                if (window.chrome) {
                    game.AudioManager.LoadAsync("switch2", "Assets/Sounds/swish.wav", false);
                }
                game.AudioManager.Sounds["switch2"].play();
            }
        }
    };

    this.FlipTransition = function(){

        animatingFlipTransition = true;


    };

    this.DeathTransition = function(emitter, time){
        animatingDeathTransition = true;
        deathEmitter = emitter;
        timeOfDeath = time;
    };

    var UpdateDeathTransition = function(){
        if((Date.now() - timeOfDeath) < 2000) {
            deathEmitter.update();
        }else{
            player.Status = "Dead";
        }
    };

    /* private functions */
    var UpdateColourTransition = function(player){
        if(player.Colour == '#FFFFFF') {
            player.PlayerImageFrame++;
            if (player.PlayerImageFrame == 7) {
                player.Colour = '#000000';
                animatingColourTransition = false;
            }
        }
        else if(player.Colour == '#000000'){
            player.PlayerImageFrame--;
            if(player.PlayerImageFrame == 0){
                player.Colour = '#FFFFFF';
                animatingColourTransition = false;
            }
        }
    };

    var UpdateFlipTransition = function(player){
        player.Rotation += rotationSpeed * (Math.PI / 180);
        if (player.Rotation >= Math.PI) {
            player.Rotation = 0;
            animatingFlipTransition = false;
        }
    };

};