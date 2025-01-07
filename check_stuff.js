// ==UserScript==
// @name        check_stuff
// @version     0.2
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

    // Fonction pour afficher la popup avec la valeur de l'attribut class
    function showClassAttribute() {
        var xpath = '//*[@id="__section0-innerGrid"]';
        var element = getElementByXPath(xpath);

        if (element) {
            var classAttribute = element.getAttribute('class');
            alert('Class attribute: ' + classAttribute);
        } else {
            console.log('Element not found.');
        }
    }

    // Appliquer la fonction initialement
    showClassAttribute();

    // Utiliser un observateur de mutations pour détecter les changements dans le DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                showClassAttribute();
            }
        });
    });

    // Configurer l'observateur pour surveiller les changements dans le body
    observer.observe(document.body, { childList: true, subtree: true });
})();