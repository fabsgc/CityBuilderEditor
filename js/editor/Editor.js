/**
 * @description Class Editor
 * @author Hikma <contact@hikma.io>
 * @licence MIT
 * @class App.Editor
 * @constructor
 */
App.Editor = function(){

    /**
     * Map instance
     * @type {App.Map}
     * @private
     */
    var _map = null;

    /**
     * Menu instance
     * @type {App.Menu}
     * @private
     */
    var _menu = null;

    /**
     * Save instance
     * @type {App.Save}
     * @private
     */
    var _save = null;

    /**
     * Tile list
     * @type {App.Tile[]}
     * @private
     */
    var _tiles = [];

    /**
     * @type {App.Config.Sprite}
     * @private
     */
    var _spriteConfig = null;

    /**
     * @type {App.Config.Map}
     * @private
     */
    var _mapConfig = null;

    /**
     * @type {Object}
     * @private
     */
    var _lastTileClicked = {};

    /**
     * @method App.Editor#Init
     * @public
     * @return {void}
     */
    this.Init = function() {
        _map = new App.Map();
        _map.Init();

        _menu = new App.Menu();
        _menu.Init();

        _save = new App.Save();
        _save.Init();

        _lastTileClicked = {
            x: 0,
            y: 0
        }

        _spriteConfig  = App.Config.Sprite;
        _mapConfig     = App.Config.Map;

        document.addEventListener("clickMap", ClickMapHandler);
        document.addEventListener("drawObject", DrawObjectHandler);
        document.addEventListener("rotateObject", RotateObjectHandler);
        document.addEventListener("deleteObject", DeleteObjectHandler);
        document.addEventListener("undo", UndoHandler);
        document.addEventListener("clear", ClearHandler);
        document.addEventListener("open", OpenHandler);
        document.addEventListener("save", SaveHandler);
    }

    /**
     * @method App.Editor#GetTileListByClick
     * @param {Tile[]} tileList
     * @private
     * @return {void}
     */
    function GetTileListByClick(tileClicked) {
        var tileList = [];

        _tiles.forEach(function(tile){
            if (tileClicked.x >= tile.position.x && tileClicked.x < tile.position.x + tile.sprite.width
            &&  tileClicked.y >= tile.position.y && tileClicked.y < tile.position.y + tile.sprite.height) {
                console.log(tile.id);
                tileList.push(tile);
            }
        });

        return tileList;
    }

    /**
     * @method App.Editor#DrawOptions
     * @param {Tile[]} tileList
     * @private
     * @return {void}
     */
    function DrawOptions(tileList) {
        console.log("Draw options");
        _menu.DrawOptions(tileList);
    }

    /**
     * @method App.Editor#ClickMapHandler
     * @param {CustomEvent} e
     * @private
     * @return {void}
     */
    function ClickMapHandler(e) {
        console.log("Click map handler");
        console.log(e.detail);

        _lastTileClicked = e.detail.tile;

        switch(_menu.GetCurrentTool()) {
            case ToolType.Select:
                DrawOptions(GetTileListByClick(e.detail.tile));
            break;

            case ToolType.Add:
                var tile = new App.Tile();
                tile.Init();
                tile.sprite = _menu.GetCurrentSprite();
                tile.position = {x: e.detail.tile.x, y:e.detail.tile.y};
                tile.rotation = 0;

                _tiles.push(tile);
                _map.Draw([tile]);

                DrawOptions(GetTileListByClick(e.detail.tile));
            break;
        }
    }

    /**
     * @method App.Editor#DrawObjectHandler
     * @param {CustomEvent} e
     * @private
     * @return {void}
     */
    function DrawObjectHandler(e) {
        console.log("Draw object handler");
        console.log(e.detail);
    }

    /**
     * @method App.Editor#RotateObjectHandler
     * @param {CustomEvent} e
     * @private
     * @return {void}
     */
    function RotateObjectHandler(e) {
        console.log("Rotate object handler");
        console.log(e.detail);

        for(var i = 0; i < _tiles.length; i++) {
            if(_tiles[i].id == e.detail.id) {
                _tiles[i].rotation = (_tiles[i].rotation + 45) % 360;
                break;
            }
        }

        _map.Clear();
        _map.Draw(_tiles);
    }

    /**
     * @method App.Editor#DeleteObjectHandler
     * @param {CustomEvent} e
     * @private
     * @return {void}
     */
    function DeleteObjectHandler(e) {
        console.log("Delete object handler");
        console.log(e.detail);

        for(var i = 0; i < _tiles.length; i++) {
            if(_tiles[i].id == e.detail.id) {
                delete _tiles[i];

                _tiles = function(tiles) {
                    var list = new Array();
                    
                    for (var i = 0; i < tiles.length; i++) {
                        if (tiles[i]) {
                            list.push(tiles[i]);
                        }
                    }

                    return list;
                }(_tiles);

                break;
            }
        }

        console.log(_tiles);

        _map.Clear();
        _map.Draw(_tiles);

        DrawOptions(GetTileListByClick(_lastTileClicked));
    }

    /**
     * @method App.Editor#UndoHandler
     * @param {CustomEvent} e
     * @private
     * @return {void}
     */
    function UndoHandler(e) {
        console.log("Undo handler");

        if(_tiles.length > 0) {
            _tiles.pop();
            _map.Clear();
            _map.Draw(_tiles);
        }

        DrawOptions(GetTileListByClick(_lastTileClicked));
    }

    /**
     * @method App.Editor#ClearHandler
     * @param {CustomEvent} e
     * @private
     * @return {void}
     */
    function ClearHandler(e) {
        console.log("Clear handler");

        _tiles = [];
        _map.Clear();

        DrawOptions(GetTileListByClick(_lastTileClicked));
    }

    /**
     * @method App.Editor#OpenHandler
     * @private
     * @return {void}
     */
    function OpenHandler() {
        console.log("Open handler");

        var tiles = JSON.parse(localStorage.getItem('tiles'));

        if(tiles != null) {
            _tiles = tiles;
            _map.Clear();
            _map.Draw(_tiles);
        }
    }

    /**
     * @method App.Editor#SaveHandler
     * @param {CustomEvent} e
     * @private
     * @return {void}
     */
    function SaveHandler(e) {
        console.log("Save handler");

        if(_tiles.length > 0) {
            localStorage.setItem('tiles', JSON.stringify(_tiles));
            _save.DisplaySave(_tiles);
        }
    }        
}