
var SceneManager = function () {
    // Holds all scenes that have been loaded
    var scenes = [];
    // Holds top level game refernece
    var game = null;

    // Initialise SceneManager
    this.Init = function(gameRef){
        // Store local game reference
        game = gameRef;
    };

    // Current scene is the one last put on top
    this.CurrentScene = function (){
        return scenes[scenes.length-1];
    };

    // Push to top of stack and activate scene
    this.Push = function (scene) {
        scenes.push(scene);
        scene.onEnter(game);

    };

    // Pop from stack and exit scene
    this.Pop = function () {
        var scene = this.CurrentScene();
        scene.onExit();
        return scenes.pop();
    };

    // Update current scene
    this.Update = function (delta){
        var scene = this.CurrentScene();
        if (scene){
            scene.Update(delta);
        }
    };

    // Render current scene
    this.Render = function (){
        var scene = this.CurrentScene();
        if (scene){
            scene.Render();
        }
    };

    // Pause current scene
    this.Pause = function (){
        var scene = this.CurrentScene();
        if (scene.onPause){
            scene.onPause();
        }
    };

    // Resume current scene
    this.Resume = function (){
        var scene = this.CurrentScene();
        if (scene.onResume){
            scene.onResume();
        }
    };
};