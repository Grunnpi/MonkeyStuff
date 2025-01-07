// ==UserScript==
// @name        check_stuff
// @version     0.5
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description This script will automagically blah blah blah
// @match        *://*/*
// @icon        https://simpleicons.org/icons/cryptomator-color.svg
// @run-at      document-end
// ==/UserScript==
(function() {
    'use strict';

    // Variable pour suivre si la popup a déjà été affichée
    var popupDisplayed = false;

    // Fonction pour obtenir l'élément par XPath
    function getElementByXPath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // Fonction pour afficher la popup avec la valeur de l'attribut class
    function showClassAttribute() {
        if (!popupDisplayed) {
            var xpath = '//*[@id="__button0"]';
            var element = getElementByXPath(xpath);

            if (element) {
                var classAttribute = element.getAttribute('class');
                alert('Class attribute: ' + classAttribute);
                popupDisplayed = true; // Mettre à jour le flag pour indiquer que la popup a été affichée
            } else {
                console.log('Element not found.');
            }
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