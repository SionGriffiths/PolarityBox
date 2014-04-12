

// Manages all the image files in the game
var ImageManager = function(){
    // Array to hold all images being used in the game
    this.Images = [];

    // Load a image file
    this.Load = function(name, imageLocation){
        // Load Image
        var image = new Image(imageLocation);
        // Assign to Array
        this.Images[name] = image;
    };

    // Load a sound file and when the sound is loaded call the callback
    this.LoadAsync = function(name, imageLocation, callback){
        var self = this;
        setTimeout(function() {
            // Load Image
            var image = new Image();
            image.src = imageLocation;
            // Assign to Array
            self.Images[name] = image;
            // Use callback if necessary to tell a program that the image is loaded
            if(callback){ image.onload = callback; }
        }, 0);
    };

    // TODO: Make multiple files load async at the same time
};