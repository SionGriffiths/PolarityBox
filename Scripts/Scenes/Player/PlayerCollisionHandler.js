

var PlayerCollisionHandler = function(){

    var player;
    var level;
    var collision;


    this.Init = function(playerRef, levelRef){
        player = playerRef;
        level = levelRef;
        collision = new CollisionDetector();
    };

    this.Update = function(){
        var currentCollisions = this.PlayerMapCollisions();

        // If collisions > 0 then we need to handle them
        if(currentCollisions.length > 0){

            //single rect collide easy to deal with
            if(currentCollisions.length == 1){
                var rect =  currentCollisions[0];

                if(this.SafeSingleCollision(rect)){
                    // If its a safe map collision set player on 'floor'
                    player.SetOnFloor(rect.Y - player.Size);
                    document.getElementById("debug2").innerHTML = "safe" + "</br>";
                }else{
                    // Not safe!
                    if(rect.C != player.C){
                        document.getElementById("debug2").innerHTML = "DIE!" + "</br>";
                        player.Die(); //ignore the collision
                    }
                }

            }
            // We have multiple collisions to deal with
            else {
                if (this.SafeMultiCollision(currentCollisions)) {
                    // If its a safe map collision set player on 'floor'
                    player.SetOnFloor(currentCollisions[0].Y - player.Size); //set player on 'floor'
                    document.getElementById("debug2").innerHTML = "safeMulti" + "</br>";
                } else {
                    // TODO: Implement multi collision detection when not necessarily safe
                    for (var index = 0; index < currentCollisions.length; index++) {

                        player.Die();
                    }
                }
            }
        }
        // No collisions, assume flying
        else{
            document.getElementById("debug2").innerHTML = "in the air?" + "</br>";
        }


    };


    //CERTIFIED WORKING METHOD MEIGHT.
    this.PlayerMapCollisions = function(){
        var currentMapRects = level.MapManager.Map.CurrentlyDisplayedMapRects();
        var playerLevelX = level.MapManager.Map.MapCanvasLocation + player.X;
        var collisionBoxes = [];

        for(var index = 0; index < currentMapRects.length; index++){
            var current = currentMapRects[index];
            var playerRect = player.rect();
            playerRect.X = playerLevelX;
            if(collision.boxIntersect(playerRect , current)){
                collisionBoxes.push(current);
            }
        }

        return collisionBoxes;
    };

    //CERTIFIED WORKING METHOD MEIGHT.
    this.SafeSingleCollision = function(collisionRect){

        var playerLevelX = level.MapManager.Map.MapCanvasLocation + player.X;
        if  (
            (collisionRect.X <= playerLevelX && collisionRect.X + collisionRect.W >= playerLevelX + player.Size) ||
            (playerLevelX <= (collisionRect.X + collisionRect.W) && (playerLevelX >= collisionRect.X)) ||
            (((playerLevelX + player.Size) >= collisionRect.X) && (playerLevelX <= collisionRect.X))
            ){
            //Might need to offset collisonrect.y with velocity Y of player.

            if(collision.isHigher(player.Y + player.Size, collisionRect.Y + player.VelocityY) && !collision.isSameColour(player.Colour, collisionRect.C)){
                return true;
            }
        }
        return false;
    };

    // Test to check whether the player is on a safe area of the map, takes rectangle array as input, player
    this.SafeMultiCollision = function(playerMapCollisions){
        if(playerMapCollisions.length > 1){
            var rect =  playerMapCollisions[0];
            for(var index = 1; index < playerMapCollisions.length; index++){
                //ignore collisions of same colour
                if(playerMapCollisions[index].C == player.C){
                    playerMapCollisions.splice(index, 1);
                    playerMapCollisions.splice(index, 1);
                }
            }
            for(var index = 1; index < playerMapCollisions.length; index++){
                if((playerMapCollisions[index].Y != rect.Y) || (collision.isSameColour(player.C, playerMapCollisions[index].C))){
                    return false;
                }
            }
            return (this.isHigher(player.Y + player.Size, rect.Y));
        }
    };



};