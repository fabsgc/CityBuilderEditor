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
     * @type {String}
     * @private
     */
    this.id = null;

    /**
     * Sprite instance
     * @type {Object}
     * @private
     */
    this.sprite = null;

    /**
     * Position
     * @type {Object}
     * @private
     */
    this.position = null;

    /**
     * Rotation
     * @type {number}
     * @private
     */
    this.rotation = null;

    /**
     * @method App.Map#Init
     * @public
     * @return {void}
     */
    this.Init = function() {
        this.id = GuidGenerator();
        this.position = { x: 0, y: 0 };
        this.rotation = 0;
    }

    /**
     * @method App.Map#Clear
     * @private
     * @return {String}
     */
    function GuidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
}