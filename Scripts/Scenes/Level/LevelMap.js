

// Level Map Class
var LevelMap = function(){
    /* public variables */

    // Display Name for level
    this.Name = null;
    // Render Map for level
    this.RenderMap = null;
    // Speed for the level
    this.Speed = null;
    // Length of the level
    this.Length = null;
    // Background Name
    this.BackgroundName = null;

    this.FloorTextureName = null;

    this.MapCanvasLocation = 0;

    this.EnemyList = [];
    /* private variables */


    // game reference
    var game = null;

    // Initialise the settings & managers
    this.Init = function (gameRef) {
        game = gameRef;
        this.RenderMap = [];
        this.Speed = 0;
        this.Length = 0;
    };

    // Update current map
    this.Update = function(){
        // Move map along unless it has reached the end of the map.
        if(this.MapCanvasLocation <= this.Length - game.Settings.Canvas.width - this.Speed) {
            this.MapCanvasLocation += this.Speed;
        }
    };

    // Draws the current map
    this.Draw = function() {
        var currentRect;
        var context = game.Settings.Context;
        context.drawImage(game.ImageManager.Images[this.BackgroundName], 0,0);

        // Loop through map array and and draw each segment to the canvas
        for(var index = 0; index < this.RenderMap.length; index++){

            // Currently being drawn block
            currentRect = this.RenderMap[index];

            // Test to make sure the current level element needs to be drawn (is on the canvas)
            if((currentRect.X >= this.MapCanvasLocation) || (currentRect.X < this.MapCanvasLocation && (currentRect.X + currentRect.W) > this.MapCanvasLocation )){
                var pattern = context.createPattern(game.ImageManager.Images[this.FloorTextureName], "repeat");
                context.fillStyle = pattern;
                context.fillRect(currentRect.X - this.MapCanvasLocation, currentRect.Y,currentRect.W, currentRect.H);
                context.fillStyle = Colours.ColourToRGB(currentRect.C, "0.75");
                context.fillRect(currentRect.X - this.MapCanvasLocation, currentRect.Y,currentRect.W, currentRect.H);
            }
        }

    };


    this.CurrentlyDisplayedMapRects = function() {
        var mapRects = [];

        for (var index = 0; index < this.RenderMap.length; index++) {
            var current = this.RenderMap[index];
            if(this.CurrentlyOnScreen(current)){
                mapRects.push(current);
            }
        }
        return mapRects;
    };

    this.CurrentlyOnScreen = function(rect){
        return((rect.X >= this.MapCanvasLocation && rect.X <= this.MapCanvasLocation + game.Settings.Canvas.width)
            || (rect.X + rect.W  >= this.MapCanvasLocation && rect.X + rect.W <= this.MapCanvasLocation + game.Settings.Canvas.width )
           || (rect.X <= this.MapCanvasLocation && rect.X + rect.W >= this.MapCanvasLocation + game.Settings.Canvas.width ));
    }
};
