var ToolType = {
    Select: "tool-select", 
    Add: "tool-add", 
    Delete: "tool-delete", 
    Save: "tool-save"
};

var OptionType = {
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
    var _currentSprite = null

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
     * @return void
     */
    this.Init = function() {
        _currentTool = ToolType.Select;
        _spriteConfig  = App.Config.Sprite;

        InitSprite();
        
        Array.from($(".tool")).forEach(function(element) {
            element.addEventListener('click', ClickMenuToolHandler);
        });

        Array.from($(".asset")).forEach(function(element) {
            element.addEventListener('click', ClickMenuAssetHandler);
        });

        Array.from($(".option")).forEach(function(element) {
            element.addEventListener('click', ClickMenuOptionHandler);
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
     * @param tileList {Tile[]}
     * @private
     * @return void
     */
    this.DrawOptions = function(tileList) {
    }

    /**
     * @method App.Menu#DrawSprite
     * @private
     * @return void
     */
    function InitSprite() {
        _spriteConfig.list.forEach(function(sprite) {
            {
                var image = document.createElement("img");
                image.setAttribute("src", sprite.sprite);
                image.setAttribute("id", sprite.id);
                $("#sprites").append(image);
            }
            
            {
                var thumbnail = document.createElement("div");
                thumbnail.setAttribute("id", sprite.id);
                thumbnail.classList.add("asset");

                var image = document.createElement("img");
                image.setAttribute("src", sprite.sprite);

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
     * @param e {Event}
     * @private
     * @return void
     */
    function ClickMenuToolHandler(e) {
        var obj = event.target;
        var toolId = obj.getAttribute("id");

        if(toolId == null) {
            obj = obj.parentNode;
            toolId  = obj.getAttribute("id");
            _currentTool = toolId;
        }

        Array.from($(".tool")).forEach(function(element) {
            element.classList.remove("selected");
        });

        obj.classList.add("selected");

        console.log(_currentTool);
    }

    /**
     * @method App.Menu#ClickMenuAssetHandler
     * @param e {Event}
     * @private
     * @return void
     */
    function ClickMenuAssetHandler(e) {
        var obj = event.target;
        var assetId = obj.getAttribute("id");

        if(assetId == null) {
            obj = obj.parentNode;
            assetId  = obj.getAttribute("id");
        }

        Array.from($(".asset")).forEach(function(element) {
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
     * @param e {Event}
     * @private
     * @return void
     */
    function ClickMenuOptionHandler(e) {
        var obj = event.target;
        var optionId = obj.getAttribute("id");

        if(optionId == null) {
            obj = obj.parentNode;
            optionId  = obj.getAttribute("id");
        }

        console.log(optionId)
    }
}