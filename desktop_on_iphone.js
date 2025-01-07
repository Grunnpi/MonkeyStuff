// ==UserScript==
// @name        desktop_on_iphone
// @version     0.1
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description This script will automagically blah blah blah
// @include *
// ==/UserScript==
(function() {
    'use strict';

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
})();