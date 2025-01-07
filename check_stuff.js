// ==UserScript==
// @name        check_stuff
// @version     0.1
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description This script will automagically blah blah blah
// @match        *://*/*
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';

    // Fonction pour obtenir l'élément par XPath
    function getElementByXPath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // XPath de l'élément cible
    var xpath = '//*[@id="__section0-innerGrid"]';

    // Obtenir l'élément
    var element = getElementByXPath(xpath);

    if (element) {
        // Récupérer la valeur de l'attribut class
        var classAttribute = element.getAttribute('class');

        // Afficher la popup avec la valeur de l'attribut class
        alert('Class attribute: ' + classAttribute);
    } else {
        alert('Element not found.');
    }
})();