// ==UserScript==
// @name        desktop_innerwidth
// @version     0.1
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description  Force the User-Agent to simulate a desktop browser
// @match        *://*/*
// @run-at       document-start
// ==/UserScript==
(function() {
    'use strict';

    // Définir les dimensions souhaitées pour simuler un environnement de bureau
    var desktopWidth = 1024;
    var desktopHeight = 768;

    // Redéfinir window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
        get: function() {
            return desktopWidth;
        }
    });

    // Redéfinir window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
        get: function() {
            return desktopHeight;
        }
    });

    // Redéfinir window.outerWidth et window.outerHeight si nécessaire
    Object.defineProperty(window, 'outerWidth', {
        get: function() {
            return desktopWidth;
        }
    });

    Object.defineProperty(window, 'outerHeight', {
        get: function() {
            return desktopHeight;
        }
    });
})();