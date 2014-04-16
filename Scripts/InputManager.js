
var InputManager = function() {

    this.mouseX = 0;
    this.mouseY = 0;
    this.keysDown = [];
    this.mouseButtons = [];

    this.InitMouse = function(element){
        var self = this;
        element.addEventListener('mousemove', function (event) {
            var x, y;

//            if (event.pageX || event.pageY) {
//                x = event.pageX;
//                y = event.pageY;
//            } else {
//                x = event.clientX + document.body.scrollLeft + document.body.scrollLeft;
//                y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//            }
//            x -= element.offsetLeft;
//            y -= element.offsetTop;

            //fix for x/y on an offset element - http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element

            var canoffset = $(GameCanvas).offset();
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;

            self.mouseX = x;
            self.mouseY = y;
        }, false);

        element.addEventListener('mousedown', function (event){
            if(($.inArray(event.which, self.mouseButtons) == -1))
                self.mouseButtons.push(event.which);
        }, false);

        element.addEventListener('mouseup', function(event){
            if (!($.inArray(event.which, self.mouseButtons) == -1)) {
                var index = self.mouseButtons.indexOf(event.which);
                if (index > -1) {
                    self.mouseButtons.splice(index, 1);
                }
            }
        }, false);
    };

    this.InitKeyboard = function(element) {
        var self = this;

        element.addEventListener('keydown', function (event){
            if($.inArray(event.keyCode, self.keysDown) == -1)
                self.keysDown.push(event.keyCode);
        }, false);

        element.addEventListener('keyup', function(event) {
            if (!($.inArray(event.keyCode, self.keysDown) == -1)) {
                var index = self.keysDown.indexOf(event.keyCode);
                if (index > -1) {
                    self.keysDown.splice(index, 1);
                }
            }
        }, false);
    };

    this.ClearMouse = function(){
        mouseButtons = [];
    };
};