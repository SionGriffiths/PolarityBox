

var PlayerAnimationHandler = function(){

    /* public variables */

    /* private variables */
    var player = null;
    var playerAnimationHandler = null;
    var animatingColourTransition = false;
    var animatingFlipTransition = false;
    var animatingDeathTransition = false;
    var rotationSpeed = 3;

    /* public functions */

    this.Init = function(playerRef){
        player = playerRef;
        playerAnimationHandler = new PlayerAnimationHandler();
    };


    this.Update = function(delta){
        if(animatingDeathTransition)
            UpdateDeathTransition();
        else {
            if (animatingColourTransition)
                UpdateColourTransition(player);
            if (animatingFlipTransition){
                UpdateFlipTransition(player);
            }
        }
    };

    this.ColourTransition = function(){
        animatingColourTransition = true;
    };

    this.FlipTransition = function(){
        animatingFlipTransition = true;
    };

    this.DeathTransition = function(){
        animatingDeathTransition = true;
    };

    var UpdateDeathTransition = function(){

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