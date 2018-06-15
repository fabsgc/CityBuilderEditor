App.Util = {
    /**
     * @method App.Save#GetElementInContainer
     * @param {String} containerId
     * @param {String} childId
     * @public
     * @return {Object}
     */
    GetElementInContainer: function(containerId, childId) {
        var element = document.getElementById(childId);
        var parent = element ? element.parentNode : {};

        return (parent.id && parent.id === containerId) ? element : {};
    },

    /**
     * @method App.Save#GetElementsInContainer
     * @param {String} containerId
     * @param {String} childClass
     * @public
     * @return {Object[]}
     */
    GetElementsInContainer: function(containerId, childClass) {
        var elementsInContainer = [];
        var elements = document.getElementsByClassName(childClass);

        Array.prototype.forEach.call(elements, function(element) {
            var parent = element ? element.parentNode : {};

            if(parent.id && parent.id === containerId) {
                elementsInContainer.push(element);
            }
        });

        return elementsInContainer;
    }
}