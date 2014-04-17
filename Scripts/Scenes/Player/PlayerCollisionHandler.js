

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

        if(this.isEndLevel()){
            level.FinishedLevel();
            return;
        }

        if(this.PlayerOnEnemyCollision()){
            player.Die();
            return;
        }
        // If collisions > 0 then we need to handle them
        if(currentCollisions.length > 0){

            //single Rect collide easy to deal with
            if(currentCollisions.length == 1){
                var rect =  currentCollisions[0];

                if(this.SafeSingleCollision(rect)){
                    // If its a safe map collision set player on 'floor'
                    player.SetOnFloor(rect.Y - player.Size);

                }else{
                    // Not safe!
                    if(rect.C != player.Colour){

                        player.Die(); //ignore the collision
                        return;
                    }
                }

            }
            // We have multiple collisions to deal with
            else {
                if (this.SafeMultiCollision(currentCollisions)) {
                    // If its a safe map collision set player on 'floor'
                    player.SetOnFloor(currentCollisions[0].Y - player.Size); //set player on 'floor'

                } else {
                    // TODO: Implement multi collision detection when not necessarily safe

                    player.Die();
                    return;

                }
            }
        }
        // No collisions, assume flying
        else{

        }


    };


    //CERTIFIED WORKING METHOD MEIGHT.
    this.PlayerMapCollisions = function(){
        var currentMapRects = level.MapManager.Map.CurrentlyDisplayedMapRects();
        var playerLevelX = level.MapManager.Map.MapCanvasLocation + player.X;
        var collisionBoxes = [];

        for(var index = 0; index < currentMapRects.length; index++){
            var current = currentMapRects[index];
            var playerRect = player.Rect();
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
                if(playerMapCollisions[index].C == player.Colour){
                    playerMapCollisions.splice(index, 1);
                    playerMapCollisions.splice(index, 1);
                }
            }
            for(var index = 1; index < playerMapCollisions.length; index++){
                if((playerMapCollisions[index].Y != rect.Y) || (collision.isSameColour(player.Colour, playerMapCollisions[index].C))){
                    return false;
                }
            }
            return (collision.isHigher(player.Y + player.Size, rect.Y + player.VelocityY));
        }
    };

    this.PlayerOnEnemyCollision = function() {

        var enemyList = level.MapManager.Map.EnemyList;

        for (var index = 0; index < enemyList.length; index++){
            if((collision.boxIntersect(player.Rect(),  enemyList[index].Rect()) &&
                !collision.isSameColour(player.Colour, enemyList[index].Colour )) &&
                !collision.isHigher(enemyList[index].Y + enemyList[index].Size, player.Y)){
                return true;
            }
        }
        return false;
    };

    this.isEndLevel = function(){
        var playerLevelX = level.MapManager.Map.MapCanvasLocation + player.X;
        if(playerLevelX > level.MapManager.Map.LevelEndX - 64){
            var rectX = level.MapManager.Map.LevelEndX-64-level.MapManager.Map.MapCanvasLocation;
            var endGameRect = {X : rectX , Y: level.MapManager.Map.LevelEndY - 46, W: 64, H: 45};
            if(collision.boxIntersect(player.Rect(), endGameRect)){
               return true;
            }
        }
        return false;
    }

};