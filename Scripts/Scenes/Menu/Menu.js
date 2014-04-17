

var Menu = function(){
    /* public variables */
    this.Name = "Menu";
    this.SelectedItem = null;

    /* private variables */
    var game = null;
    var menuInputHandler = null;
    var assetsLoaded = false;
    var assetsToLoad = 4;
    var imagesLoaded = 0;
    var sceneTime = 0;
    // TODO: Give these names that make sense
    this.menuItems = ["Play",  "High Scores"];
    this.y = 200;
    this.size = 24;

    // When the Menu is loaded
    this.onEnter = function (gameRef){
        // Store local game reference
        game = gameRef;
        //Hide overlay text if any
        game.HideOverlay();
        // Create and Init Menu Input Handler
        menuInputHandler = new MenuInputHandler();
        menuInputHandler.Init(this, game);

        // Load Menu Assets
        game.ImageManager.LoadAsync("MenuBackground", "Assets/Images/bg1.png", this.loadCallback());
        game.ImageManager.LoadAsync("titlePic", "Assets/Images/title.png", this.loadCallback());
        game.AudioManager.LoadAsync("selectSound", "Assets/Sounds/select.ogg", this.loadCallback()); // Might want to add a callback!
        game.AudioManager.LoadAsync("confirmSound", "Assets/Sounds/confirm.ogg", this.loadCallback());


    };

    // When the Menu is updated
    this.Update  = function (delta) {
        // Update moving items on the menu
        // TODO: Make the menu move and look awesomeness

        sceneTime += delta;
        // Update player input events
        if(sceneTime > 100) {
            menuInputHandler.HandleInputs(delta);
        }
//        this.playMenuMusic();
    };

    // When the Menu is rendered (call after the update function
    this.Render  = function () {
        var context = game.Settings.Context;
        var canvas_width = game.Settings.Canvas.width;
        var canvas_height = game.Settings.Canvas.height;
        if(assetsLoaded) {

            try {
                context.drawImage(game.ImageManager.Images["MenuBackground"], 0, 0, canvas_width, canvas_height);
                context.drawImage(game.ImageManager.Images["titlePic"], ((canvas_width / 2) - 226), 25, 452, 50);
            }catch(err){}
            context.textAlign = "center";
            context.fillStyle = "White";

            for (var i = 0; i < this.menuItems.length; ++i) {
                var size = this.size;

                if (this.SelectedItem == i) {
                    context.fillStyle = "rgb(100,255,255)";
                    size = this.size*1.2;
                }

                context.font = size.toString() + "px Roboto";
                this.y += this.size + 20;
                context.fillText(this.menuItems[i], canvas_width / 2, this.y);
                context.fillStyle = "White";
            }
            this.y = 200;
        }else {
            context.textAlign = "center";
            context.font = "24px Helvetica";
            context.fillText("Loading...", canvas_width / 2, canvas_height / 2);
        }
    };

    this.loadCallback = function(){
        imagesLoaded++;
        if(imagesLoaded == assetsToLoad){
            assetsLoaded = true;
        }
    };

    this.playMenuMusic =  function(){
        if(assetsLoaded) {
            game.AudioManager.Sounds["menu"].play();
        }
    };

    // Not used for the menu
    this.onPause = function (){ console.log("Why would you pause a menu ... "); };
    this.onResume= function (){ console.log("You even tried to un-pause it!?!"); };
    // When the Menu is unloaded
    this.onExit  = function (){};
};