// ==UserScript==
// @name        desktop_sap.js
// @version     0.3
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description  Force SAP JavaScript to return desktop mode
// @match        *://*/*
// @icon        https://cdn.simpleicons.org/bilibili/pink
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';

    // Redéfinir les propriétés sap.ui.Device.system pour simuler un environnement de bureau
    Object.defineProperty(sap.ui.Device.system, 'desktop', {
        get: function() {
            return true;
        }
    });

    Object.defineProperty(sap.ui.Device.system, 'tablet', {
        get: function() {
            return true;
        }
    });

    Object.defineProperty(sap.ui.Device.system, 'phone', {
        get: function() {
            return true;
        }
    });

    // Redéfinir les propriétés window.innerWidth et window.innerHeight pour simuler un écran de bureau
    Object.defineProperty(window, 'innerWidth', {
        get: function() {
            return 1024;
        }
    });

    Object.defineProperty(window, 'innerHeight', {
        get: function() {
            return 768;
        }
    });
})();