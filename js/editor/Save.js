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
     * @method App.Save#DisplaySave
     * @param {Tile[]} tileList
     * @public
     * @return {void}
     */
    this.DisplaySave = function(tileList) {
        var json = [];
        document.getElementById("save").classList.remove("hidden");

        tileList.forEach(function(tile) {
            var object = {
                id: tile.sprite.id,
                width: tile.sprite.width,
                height: tile.sprite.height,
                material: tile.sprite.material,
                model: tile.sprite.model,
                position: tile.position,
                rotation: tile.rotation,
                token: tile.id
            }

            json.push(object);
        })

        DisplayJSON(json);
        DisplayXML(json);
    }

    /**
     * @method App.Save#DisplayJSON
     * @param {Object} json
     * @private
     * @return {void}
     */
    function DisplayJSON(json) {
        document.getElementById("save-content-json").innerHTML = JSON.stringify(json, null, 2);
    }

    /**
     * @method App.Save#DisplayJSON
     * @param {Object} json
     * @private
     * @return {void}
     */
    function DisplayXML(json) {
        var xml = '<?xml version="1.0" encoding="UTF-8"?>';
        xml += "\n<models>";

        json.forEach(function(object) {
            xml += "\n  <model ";
            xml += 'id="' + object.id + '" ';
            xml += 'width="' + object.width + '" ';
            xml += 'height="' + object.height + '" ';
            xml += 'material="' + object.material + '" ';
            xml += 'model="' + object.model + '" ';
            xml += 'x="' + object.position.x + '" ';
            xml += 'y="' + object.position.y + '" ';
            xml += 'rotation="' + object.rotation + '" ';
            xml += 'token="' + object.token + '" ';
            xml += "/>";
        });

        xml += "\n</models>";
        xml = xml.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g, '&nbsp;')

        console.log(xml);

        document.getElementById("save-content-xml").innerHTML = xml;
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