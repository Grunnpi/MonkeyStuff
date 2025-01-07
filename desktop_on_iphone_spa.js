// ==UserScript==
// @name        desktop_on_iphone_spa
// @version     0.2
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description This script will automagically blah blah blah
// @match        *://*/*
// ==/UserScript==
(function() {
    'use strict';

    function setViewport() {
        // Crée une nouvelle balise meta pour le viewport
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=1024'; // Largeur de viewport pour simuler un desktop

        // Supprime les balises meta viewport existantes
        var existingMeta = document.querySelector('meta[name="viewport"]');
        if (existingMeta) {
            existingMeta.parentNode.removeChild(existingMeta);
        }

        // Ajoute la nouvelle balise meta au head
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Applique le viewport initialement
    setViewport();

    // Utilise un observateur de mutations pour détecter les changements dans le DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                setViewport();
            }
        });
    });

    // Configure l'observateur pour surveiller les changements dans le body
    observer.observe(document.body, { childList: true, subtree: true });
})();