

// Manages all the audio files in the game
var AudioManager = function() {
    // Array to hold all sounds being used in the game
    this.Sounds = [];

    // Load a sound file
    this.Load = function(name, soundLocation){
        // Load Sound
        var audio = new Audio(soundLocation);
        // Assign to Array
        this.Sounds[name] = audio;
    };

    // Load a sound file and when the sound is loaded call the callback
    this.LoadAsync = function(name, soundLocation, callback){
        var self = this;
        setTimeout(function() {
            // Load Sound - HTML5 audio type.
            var audio = new Audio(soundLocation);
            // Assign to Array
            self.Sounds[name] = audio;
            // Use callback if necessary to tell a program that the sound is loaded
            if(callback){
                audio.addEventListener('loadeddata', callback, false);
            }
        }, 0);
    };

    // This stops all, the this.Sounds is an associative array so it needs to be called by key value
    this.StopAll = function(){
        for (var key in this.Sounds) {
            this.Sounds[key].pause();
            if(this.Sounds[key].readyState == "HAVE_CURRENT_DATA"){
                this.Sounds[key].currentTime = 0;
            }

        }
    };

    // TODO: Make multiple files load async at the same time
};