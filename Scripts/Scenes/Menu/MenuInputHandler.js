

// Gets the current Keys being pressed and handles them on each game loop
var MenuInputHandler = function() {
    var menu = null;
    var game = null;
    var loading = false;

    // Initialise MenuInputHandler with menu reference, and game reference
    this.Init = function(menuRef, gameRef){
        menu = menuRef;
        game = gameRef;
    };

    // TODO: Move the Handle Inputs from an polling based system to an Event Based system
    this.HandleInputs = function(){
        var canvas_width = game.Settings.Canvas.width;
        var x = game.InputManager.mouseX;
        var y = game.InputManager.mouseY;
        var buttons = game.InputManager.mouseButtons;

        // Update inputs on canvas to pick up where the mouse is
        if (x > canvas_width / 2 - 100 && x < canvas_width / 2 + 100) {
            if (y >= 220 && y < 256) {
                menu.SelectedItem = 0;
            } else if (y >= 256 && y < 300) {
                menu.SelectedItem = 1;
            } else if (y >= 300 && y < 345) {
                menu.SelectedItem = 2;
            } else if (y >= 345 && y < 385) {
                menu.SelectedItem = 3;
            } else {
                menu.SelectedItem = null;
            }
        } else {
            menu.SelectedItem = null;
        }

        // Check if the left click hasn't been pressed down
        if(!($.inArray(1, buttons) == -1)) // Left Click
        {
            if(menu.SelectedItem == 0){
                if(!loading)
                {
                    loading = true;
                    game.LevelNumber = 6;
                    game.LevelManager.LoadLevel(game.LevelNumber);
                }
            }
        }
    };
};

