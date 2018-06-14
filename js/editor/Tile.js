/**
 * @description Class Tile
 * @author Hikma <contact@hikma.io>
 * @licence MIT
 * @class App.Tile
 * @constructor
 */
App.Tile = function(){
    /**
     * Sprite instance
     * @type {Object}
     * @private
     */
    var _sprite = null;

    /**
     * Position
     * @type {Object}
     * @private
     */
    var _position = null;

    /**
     * Rotation
     * @type {number}
     * @private
     */
    var _rotation = null;

    /**
     * @method App.Map#Init
     * @public
     * @return void
     */
    this.Init = function() {
        _position = { x: 0, y: 0 };
        _rotation = 0;
    }
}