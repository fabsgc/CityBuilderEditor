/**
 * @description Class Map
 * @author Hikma <contact@hikma.io>
 * @licence MIT
 * @class App.Map
 * @constructor
 */
App.Map = function(){

    /**
     * @type {App.Config.Map}
     * @private
     */
    var _config = null;

    /**
     * @type {Object}
     * @private
     */
    var _canvas = null;

    /**
     * @type {Object}
     * @private
     */
    var _canvasContext = null;

    /**
     * @type {Object}
     * @private
     */
    var _currentTile = null

    /**
     * @method App.Map#Init
     * @public
     * @return void
     */
    this.Init = function() {
        _config = App.Config.Map;

        InitMap();
    }

    /**
     * @method App.Map#InitMap
     * @public
     * @return void
     */
    function InitMap() {
        _canvas = document.getElementById("map");
        _canvas.setAttribute("width", String(_config.Width * _config.TileWidth));
        _canvas.setAttribute("height", String(_config.Height * _config.TileHeight));

        if (_canvas.getContext) {
            _ctx = _canvas.getContext('2d');
        }

        _canvas.addEventListener('click', TileClickHandler);
    }

    /**
     * @method App.Map#TileClickHandler
     * @private
     * @return void
     */
    function TileClickHandler(e) {
        const scroll = {
            x: window.pageXOffset || document.body.scrollLeft || 0,
            y: window.pageYOffset || document.body.scrollTop || 0
        }

        const mousePos = {
            x: (e.clientX - 250) + scroll.x,
            y: (e.clientY) + scroll.y
        };

        var tileClicked = {
            x: parseInt(mousePos.x / _config.TileWidth),
            y: parseInt(mousePos.y / _config.TileHeight)
        }

        console.log(mousePos);
        console.log(tileClicked);

        var event = new CustomEvent('clickMap', { 
            'detail': {
                tile: tileClicked
            }
        });

        document.dispatchEvent(event);
    }

    /**
     * @method App.Map#Draw
     * @param tileList {Tile[]}
     * @public
     * @return void
     */
    this.Draw = function(tileList) {
    }

    /**
     * @method App.Map#Clear
     * @public
     * @return void
     */
    this.Clear = function() {
    }
}