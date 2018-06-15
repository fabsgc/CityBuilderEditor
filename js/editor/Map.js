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
     * @return {void}
     */
    this.Init = function() {
        _config = App.Config.Map;
        InitMap();
    }

    /**
     * @method App.Map#InitMap
     * @public
     * @return {void}
     */
    function InitMap() {
        _canvas = document.getElementById("map");
        _canvas.setAttribute("width", String(_config.Width * _config.TileWidth));
        _canvas.setAttribute("height", String(_config.Height * _config.TileHeight));

        if (_canvas.getContext) {
            _canvasContext = _canvas.getContext('2d');
            _canvasContext.globalAlpha = 0.6;
        }

        _canvas.addEventListener('click', TileClickHandler);
    }

    /**
     * @method App.Map#Draw
     * @param {Tile[]} tileList
     * @public
     * @return {void}
     */
    this.Draw = function(tileList) {
        tileList.forEach(function(tile){
            var image = new Image();
            image.src = tile.sprite.sprite;

            var position = {
                x: tile.position.x * _config.TileWidth,
                y: tile.position.y * _config.TileHeight
            }

            if(tile.rotation == 0) {
                _canvasContext.drawImage(image, position.x, position.y);
            }
            else {
                DrawRotatedImage(image, position.x, position.y, tile.rotation);
            }
            
            console.log("Draw " + tile.sprite.id + " at " + position.x + "/" + position.y);
        });
    }

    /**
     * @method App.Map#Clear
     * @public
     * @return {void}
     */
    this.Clear = function() {
        console.log("Clear view");
        _canvasContext.clearRect(0, 0, _canvas.width, _canvas.height);
    }

    /**
     * @method App.Map#TileClickHandler
     * @private
     * @return {void}
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

        var event = new CustomEvent("clickMap", {
            "detail": {
                tile: tileClicked
            }
        });

        document.dispatchEvent(event);
    }

    /**
     * @method App.Map#DrawRotatedImage
     * @param {Image} image
     * @param {number} x
     * @param {number} y
     * @param {number} angle
     * @public
     * @return {void}
     */
    function DrawRotatedImage(image, x, y, angle) { 
        _canvasContext.save(); 
        _canvasContext.translate(x + image.width/2, y + image.height/2);
        _canvasContext.rotate(angle * Math.PI/180.0);
        _canvasContext.drawImage(image, -(image.width/2), -(image.height/2));
        _canvasContext.restore();
    }
}