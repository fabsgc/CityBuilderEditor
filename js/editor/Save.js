/**
 * @description Class Save
 * @author Hikma <contact@hikma.io>
 * @licence MIT
 * @class App.Save
 * @constructor
 */
App.Save = function(){

    /**
     * @method App.Save#Init
     * @public
     * @return {void}
     */
    this.Init = function() {
        document.getElementById("save-close").addEventListener("click", CloseHandler);
    }

    /**
     * @method App.Save#Init
     * @param {Tile[]} tileList
     * @public
     * @return {void}
     */
    this.DisplaySave = function(tileList) {
        var data = [];
        document.getElementById("save").classList.remove("hidden");

        tileList.forEach(function(tile) {
            var object = {
                id: tile.sprite.id,
                width: tile.sprite.width,
                height: tile.sprite.height,
                position: tile.position,
                rotation: tile.rotation
            }

            data.push(object);
        })

        document.getElementById("save-content").innerHTML = JSON.stringify(data, null, 2);
    }

    /**
     * @method App.Editor#OpenHandler
     * @private
     * @return {void}
     */
    function CloseHandler() {
        console.log("Close handler");
        document.getElementById("save").classList.add("hidden");
    }
}