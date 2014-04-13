
// Loads Map Assets
var LevelMapManager = function() {
    /* public variables */
    // Solid Map Floor
    this.Map = null;

    // Map is Loaded
    this.Loaded = false;

    /* private variables */
    // Game reference
    var game = null;

    //Image loading
    var elementsToLoad = 0;
    var elementsLoaded = 0;

    // Initialise the Map Manager Handlers
    this.Init = function(gameRef){
        game = gameRef;
        this.Map = new LevelMap();
        this.Map.Init(game);
    };

    this.loadCallBack = function(){
        elementsLoaded++;
        if(elementsToLoad == elementsLoaded){
            this.Loaded = true;
        }
    };

    // Loads Map from given location using Ajax
    this.LoadMap = function(mapLocation)
    {
        var self = this;


        $.getJSON(mapLocation,  function(mapData) {
            self.Map.Name = mapData.Name;
            self.Map.Speed = mapData.Speed;
            self.Map.Length = mapData.Length;
            self.Map.LevelEndX = mapData.EndX;
            self.Map.LevelEndY = game.Settings.Canvas.height - mapData.EndY;
            elementsToLoad++;
            game.AudioManager.LoadAsync("levelMusic", mapData.Music, self.loadCallBack());
            elementsToLoad += mapData.LevelImages.length;
            // Read height map and convert to Y so box height is from bottom.
            $.each(mapData.HeightMap, function(i, item) {
                self.Map.RenderMap.push({
                    X: item.X,
                    Y: game.Settings.Canvas.height - item.H,
                    W: item.W,
                    H: item.H,
                    C: item.C
                });
            });

            $.each(mapData.LevelImages, function(i, item){
                if(Strings.Contains(item.ID, "Background")){
                    self.Map.BackgroundName = item.ID;
                }
                if(Strings.Contains(item.ID, "Floor")){
                    self.Map.FloorTextureName = item.ID;
                }
                game.ImageManager.LoadAsync(item.ID, item.Src, self.loadCallBack());
            });

            $.each(mapData.EnemyBlocks, function(i, item){
                var block = new EnemyBlock(item.X, -mapData.Speed, (game.Settings.Canvas.height - item.H));
                block.Init(game);
                self.Map.EnemyList.push(block);
            });
        });
    };


};