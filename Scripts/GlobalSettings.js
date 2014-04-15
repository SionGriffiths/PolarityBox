
var GlobalSettings = function() {

    // Game System Globals
    this.Canvas = null;
    this.Context = null;
    this.Fps = 0;
    this.playerLives = 10;
    // Timings
    this.LastUpdateTime = null;

    // Game Status Globals
    this.Paused = false;

    // Game Variable Globals
    this.Gravity = 0.25;
};