

var CollisionDetector = function(){

    this.isHigher = function(height1 , height2){
        return (height1 <= height2);
    };

    this.isSameColour = function(colour1, colour2){
        return (colour1 == colour2);
    };

    this.boxIntersect = function(rectA, rectB) {
        return !(rectA.X + rectA.W < rectB.X ||
            rectB.X + rectB.W < rectA.X ||
            rectA.Y + rectA.H < rectB.Y ||
            rectB.Y + rectB.H < rectA.Y);
    };


};