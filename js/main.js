/**
 * @description Entry point of the application
 * @author Hikma <contact@hikma.io>
 * @licence MIT
 * @class App.Editor
 * @constructor
 */

App = {};
App.Config = {};

requirejs.config({baseUrl: 'js/'});

requirejs([
    'data/Map',
    'data/Sprite',
    'editor/Editor',
    'editor/Util',
    'editor/Map',
    'editor/Menu',
    'editor/Tile',
    'editor/Save'
], function () {
    var editor = new App.Editor();
    editor.Init();
});