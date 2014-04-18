
var LevelInputHandler = function(){
    var level = null;
    var game = null;

    // Initialise LevelInputHandler with level reference, and game reference
    this.Init = function(levelRef, gameRef){
        level = levelRef;
        game = gameRef;
    };

    // TODO: Move the Handle Inputs from an polling based system to an Event Based system
    this.HandleInputs = function(){
        var canvas_width = game.Settings.Canvas.width;
        var x = game.InputManager.mouseX;
        var y = game.InputManager.mouseY;
        var buttons = game.InputManager.mouseButtons;
        var keys = game.InputManager.keysDown;

        // Keyboard stuff
//        if(!($.inArray(68, keys) == -1) && (!($.inArray(65, keys) == -1)))
//            level.player.VelocityX = 0;
//        else if(!($.inArray(68, keys) == -1))
//            level.player.VelocityX = 3;
//        else if(!($.inArray(65, keys) == -1))
//            level.player.VelocityX = -3;
//        else level.player.VelocityX = 0;

        if(!($.inArray(32, keys) == -1)) {
            level.player.Jump();
        }

        if(!($.inArray(83, keys) == -1)) {
            level.player.ChangeColour();
        }

        // Mouse stuff
        if(!($.inArray(1, buttons) == -1)) // Left Click
        {
            if (!level.player.Ready) {
                level.player.Ready = true;
                game.HideOverlay();

            }
            else
                level.player.Jump();
        }

//        if(!($.inArray(2, buttons) == -1)) // Middle Mouse
//            level.player.Flip();

        if(!($.inArray(3, buttons) == -1)) // Right Click
            level.player.ChangeColour();


    };
};