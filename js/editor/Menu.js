var ToolType = {
    Select: "tool-select", 
    Add: "tool-add", 
    Clear: "tool-clear", 
    Undo: "tool-undo", 
    Open: "tool-open", 
    Save: "tool-save"
};

var OptionType = {
    Info: "option-info",
    Rotate: "option-rotate",
    Delete: "option-delete"
};

/**
 * @description Class Menu
 * @author Hikma <contact@hikma.io>
 * @licence MIT
 * @class App.Map
 * @constructor
 */
App.Menu = function(){

    /**
     * Tool type
     * @type {String}
     * @private
     */
    var _currentTool = null;

    /**
     * @type {Object}
     * @private
     */
    var _currentSprite = null;

    /**
     * @type {Tile[]}
     * @private
     */
    var _currentTiles = [];

    /**
     * Option type
     * @type {String}
     * @private
     */
    var _currentOption = null;

    /**
     * @type {App.Config.Sprite}
     * @private
     */
    var _spriteConfig = null;

    /**
     * @method App.Menu#Init
     * @public
     * @return {void}
     */
    this.Init = function() {
        _currentTool = ToolType.Add;
        _spriteConfig  = App.Config.Sprite;

        InitSprite();
        
        Array.from(document.getElementsByClassName("tool")).forEach(function(element) {
            element.addEventListener("click", ClickMenuToolHandler);
        });

        Array.from(document.getElementsByClassName("asset")).forEach(function(element) {
            element.addEventListener("click", ClickMenuAssetHandler);
        });

        Array.from(document.getElementsByClassName("option")).forEach(function(element) {
            element.addEventListener("click", ClickMenuOptionHandler);
        });
    }

    /**
     * @method App.Menu#GetCurrentTool
     * @public
     * @return {String}
     */
    this.GetCurrentTool = function() {
        return _currentTool;
    }

    /**
     * @method App.Menu#GetCurrentSprite
     * @public
     * @return {String}
     */
    this.GetCurrentSprite = function() {
        return _currentSprite;
    }

    /**
     * @method App.Menu#DrawOptions
     * @param {Tile[]} tileList
     * @private
     * @return {void}
     */
    this.DrawOptions = function(tileList) {
        console.log("Draw options");
        console.log(tileList);

        _currentTiles = tileList;
        ResetOptions();

        _currentTiles.forEach(function(tile) {
            DrawOptionElement(tile);
        });
    }

    /**
     * @method App.Menu#ResetOptions
     * @private
     * @return {void}
     */
    function ResetOptions() {
        var node = document.getElementById("tile-list");

        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    /**
     * @method App.Menu#DrawOptionElement
     * @param {Tile[]} tile
     * @private
     * @return {void}
     */
    function DrawOptionElement(tile) {
        var tileElement = document.createElement("div");
        tileElement.classList.add("tile-element");
        tileElement.setAttribute("id", "tile-" + tile.id);

        var menuThumbnail = document.createElement("div");
        menuThumbnail.classList.add("menu-thumbnail");

        var image = document.createElement("img");
        image.src = tile.sprite.thumbnail;

        var menuContent = document.createElement("div");
        menuContent.classList.add("menu-content");
        menuContent.setAttribute("id", tile.id);

        var optionInfo = document.createElement("div");
        optionInfo.setAttribute("option", "option-info");
        optionInfo.setAttribute("id", "option-info-" + tile.id);
        optionInfo.setAttribute("value", tile.rotation);
        optionInfo.classList.add("option");
        optionInfo.innerHTML = tile.rotation + "°";

        var optionRotate = document.createElement("div");
        optionRotate.setAttribute("option", "option-rotate");
        optionRotate.setAttribute("id", "option-rotate-" + tile.id);
        optionRotate.classList.add("option");

        var spanRotate = document.createElement("span");
        spanRotate.classList.add("fa");
        spanRotate.classList.add("fa-redo-alt");

        var optionDelete = document.createElement("div");
        optionDelete.setAttribute("option", "option-delete");
        optionDelete.setAttribute("id", "option-delete-" + tile.id);
        optionDelete.classList.add("option");

        var spanDelete = document.createElement("span");
        spanDelete.classList.add("fa");
        spanDelete.classList.add("fa-trash-alt");

        optionRotate.appendChild(spanRotate);
        optionDelete.appendChild(spanDelete);

        menuContent.appendChild(optionInfo);
        menuContent.appendChild(optionRotate);
        menuContent.appendChild(optionDelete);

        menuThumbnail.appendChild(image);

        tileElement.appendChild(menuThumbnail);
        tileElement.appendChild(menuContent);

        optionRotate.onclick = ClickMenuOptionHandler;
        optionDelete.onclick = ClickMenuOptionHandler;

        document.getElementById("tile-list").appendChild(tileElement);
    }

    /**
     * @method App.Menu#DrawSprite
     * @private
     * @return {void}
     */
    function InitSprite() {
        _spriteConfig.list.forEach(function(sprite) {
            {
                var image = document.createElement("img");
                image.setAttribute("src", sprite.sprite);
                image.setAttribute("id", sprite.id);
                document.getElementById("sprites").appendChild(image);
            }
            
            {
                var thumbnail = document.createElement("div");
                thumbnail.setAttribute("id", sprite.id);
                thumbnail.setAttribute("title", sprite.name);
                thumbnail.classList.add("asset");

                var image = document.createElement("img");
                image.setAttribute("src", sprite.thumbnail);

                var name = document.createElement("span");
                name.innerHTML = "(" + String(sprite.width) + "x" + String(sprite.height) + ")";

                thumbnail.append(image);
                thumbnail.append(name);

                if(sprite.selected) {
                    thumbnail.classList.add("selected");
                    _currentSprite = sprite;
                }

                $("#menu-asset .menu-content").append(thumbnail);
            }
        });
    }

    /**
     * @method App.Menu#ClickMenuToolHandler
     * @param {Event} e
     * @private
     * @return {void}
     */
    function ClickMenuToolHandler(e) {
        var obj = e.target;
        var toolId = obj.getAttribute("id");

        if(toolId == null) {
            obj = obj.parentNode;
            toolId  = obj.getAttribute("id");
        }

        Array.from(document.getElementsByClassName("tool")).forEach(function(element) {
            element.classList.remove("selected");
        });

        _currentTool = toolId;
        obj.classList.add("selected");

        switch(_currentTool){
            case ToolType.Undo: {
                var event = new CustomEvent('undo', {});
                document.dispatchEvent(event);
            } break;

            case ToolType.Clear: {
                var event = new CustomEvent('clear', {});
                document.dispatchEvent(event);
            } break;

            case ToolType.Open: {
                var event = new CustomEvent('open', {});
                document.dispatchEvent(event);
            } break;

            case ToolType.Save: {
                var event = new CustomEvent('save', {});
                document.dispatchEvent(event);
            } break;
        }

        console.log(_currentTool);
    }

    /**
     * @method App.Menu#ClickMenuAssetHandler
     * @param {Event} e
     * @private
     * @return {void}
     */
    function ClickMenuAssetHandler(e) {
        var obj = e.target;
        var assetId = obj.getAttribute("id");

        if(assetId == null) {
            obj = obj.parentNode;
            assetId  = obj.getAttribute("id");
        }

        Array.from(document.getElementsByClassName("asset")).forEach(function(element) {
            element.classList.remove("selected");
        });

        _spriteConfig.list.forEach(function(sprite) {
            if(sprite.id == assetId) {
                _currentSprite = sprite;
            }
        });

        obj.classList.add("selected");

        console.log(_currentSprite);
    }

    /**
     * @method App.Menu#ClickMenuOptionHandler
     * @param {Event} e
     * @private
     * @return {void}
     */
    function ClickMenuOptionHandler(e) {
        var obj = e.target;
        var optionType = obj.getAttribute("option");
        var tileId = obj.parentNode.getAttribute("id");

        if(optionType == null) {
            obj = obj.parentNode;
            optionType = obj.getAttribute("option");
            tileId     = obj.parentNode.getAttribute("id");
        }

        switch(optionType){
            case OptionType.Rotate: {
                var optionInfo = document.getElementById("option-info-" + tileId);
                var value = String((parseInt(optionInfo.getAttribute("value")) + 45) % 360);
                optionInfo.innerHTML = value + "°" ;
                optionInfo.setAttribute("value", value);

                var event = new CustomEvent('rotateObject', {
                    detail : { id: tileId}
                });
                document.dispatchEvent(event);
            } break;

            case OptionType.Delete: {
                var tileElement = document.getElementById("tile-" + tileId);
                var tileList = document.getElementById("tile-list");

                tileList.removeChild(tileElement);

                var event = new CustomEvent('deleteObject', {
                    detail : { id: tileId}
                });
                document.dispatchEvent(event);
            } break;
        }

        console.log(optionType)
        console.log(tileId);
    }
}