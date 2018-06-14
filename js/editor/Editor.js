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
     * @method App.Map#Init
     * @public
     * @return void
     */
    this.Init = function() {
        _map = new App.Map();
        _map.Init();

        _menu = new App.Menu();
        _menu.Init();

        _spriteConfig  = App.Config.Sprite;
        _mapConfig     = App.Config.Map;

        document.addEventListener("clickMap", ClickMapHandler);
        document.addEventListener("drawObject", DrawObjectHandler, false);
        document.addEventListener("rotateObject", RotateObjectHandler, false);
        document.addEventListener("deleteObject", DeleteObjectHandler, false);
        document.addEventListener("clear", ClearHandler, false);
    }

    /**
     * @method App.Editor#GetTileListByClick
     * @param tileList {Tile[]}
     * @private
     * @return void
     */
    function GetTileListByClick(tileClicked) {
        var tileList = [];
        return tileList;
    }

    /**
     * @method App.Editor#Save
     * @private
     * @return void
     */
    function Save() {
    }

    /**
     * @method App.Editor#DrawOptions
     * @param tileList {Tile[]}
     * @private
     * @return void
     */
    function DrawOptions(tileList) {
        _menu.DrawOptions(tileList);
    }

    /**
     * @method App.Editor#ClickMapHandler
     * @param e {CustomEvent}
     * @private
     * @return void
     */
    function ClickMapHandler(e) {
        console.log(e.detail);
    }

    /**
     * @method App.Editor#DrawObjectHandler
     * @param e {CustomEvent}
     * @private
     * @return void
     */
    function DrawObjectHandler(e) {
        console.log(e.detail);
    }

    /**
     * @method App.Editor#RotateObjectHandler
     * @param e {CustomEvent}
     * @private
     * @return void
     */
    function RotateObjectHandler(e) {
        console.log(e.detail);
    }

    /**
     * @method App.Editor#DeleteObjectHandler
     * @param e {CustomEvent}
     * @private
     * @return void
     */
    function DeleteObjectHandler(e) {
        console.log(e.detail);
    }

    /**
     * @method App.Editor#ClearHandler
     * @param e {CustomEvent}
     * @private
     * @return void
     */
    function ClearHandler(e) {
        console.log(e.detail);
    }
}