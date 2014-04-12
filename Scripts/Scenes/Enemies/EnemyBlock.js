/**
 * Created by pooey on 12/04/2014.
 */

var EnemyBlock = function(x, floorHeight){

    this.X = x;
    this.Y = floorHeight - size;
    this.colour = "FFFFFF";

    var enemyImageHeight = 51;
    var enemyImageWidth = 51;
    var imageFrame = 0;
    var jumping = false;
    var jumpSpeed = 3;
    var size = 25;
    var floorheight = floorHeight;
    var enemyCollision = null;
    var enemyAnimation = null;
    var game = null;
    var level = null;




    this.init = function(levelRef, gameRef){
        game = gameRef;
        level = levelRef;
    };

    this.draw = function(){

    };




}