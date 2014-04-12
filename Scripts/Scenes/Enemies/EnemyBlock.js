/**
 * Created by pooey on 12/04/2014.
 */

var EnemyBlock = function(x, velXparam, floorHeight){

    this.Size = 25;
    this.X = x;
    this.Y = floorHeight - this.Size;
    var floor = this.Y;
    this.Colour = "#FFFFFF";

    var velY = 0;
    var velX = velXparam;
    var jumpSpeed = 3;
    var enemyImageHeight = 51;
    var enemyImageWidth = 51;
    var imageFrame = 0;

    var changingColour = false;
    var jumping = false;
    var jumpSpeed = 3;


    var game = null;

    this.Init = function(gameRef){
        game = gameRef;
        game.ImageManager

    };

    this.Update = function() {
        velY += game.Settings.Gravity;
        this.Y += velY;
        this.X += velX;

        // Stop block falling out of the level stupidly.
        if (this.Y >= floor) {
            this.Y = floor;
            jumping = false;
        }

        if(Math.floor((Math.random()*100)+1) < 2) {
            this.DoColourChange();
        }
        if(Math.floor((Math.random()*100)+1) < 2) {
            this.Jump();
        }
    };

    this.Draw = function(){
        if(changingColour){
            this.ChangeColour();
        }
        this.DrawImage();
    };

    this.DrawImage = function(){
        game.Settings.Context.drawImage(
            game.ImageManager.Images["EnemyBlockImage"],
                imageFrame * enemyImageWidth,
            0,
            enemyImageWidth,
            enemyImageHeight,
            this.X,
            this.Y,
            this.Size,
            this.Size);
    };

    this.Jump = function() {
        if (!jumping) {
            velY =- jumpSpeed*2;
            jumping = true;
        }
    };

    this.DoColourChange = function(){
        if(!changingColour) {
            changingColour = true;
        }
    };

    this.ChangeColour = function(){

        if(this.Colour == '#FFFFFF') {
            imageFrame++;
            if (imageFrame == 7) {
                this.Colour = '#000000';
                changingColour = false;
            }
        }
        else if(this.Colour == '#000000'){
            imageFrame--;
            if(imageFrame == 0){
                this.Colour = '#FFFFFF';
                changingColour = false;
            }
        }
    };

    this.Rect = function(){
        return {X : this.X, Y : this.Y, W: this.Size, H: this.size};
    }
}