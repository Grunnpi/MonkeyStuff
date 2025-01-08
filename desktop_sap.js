// ==UserScript==
// @name        desktop_sap.js
// @version     0.4
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


    // Attendre que le module soit chargé
    sap.ui.require(["sap/ui/model/odata/v2/ODataModel"], function(D) {
        if (D) {
            // Sauvegarder la méthode originale
            const originalCallFunction = D.prototype.callFunction;

            // Encapsuler la méthode originale
            D.prototype.callFunction = function(i, P) {
                console.log('Avant la méthode callFunction');
                // Ajoutez ici le code supplémentaire ou modifié
                originalCallFunction.apply(this, arguments);
                console.log('Après la méthode callFunction');
            };

               /*
            // Tester la méthode surchargée
            var myObject = new D({
                serviceUrl: "/path/to/service"
            });
            myObject.callFunction('test1', 'test2');
                */
        } else {
            console.error('Le module sap/ui/model/odata/v2/ODataModel n\'est pas défini.');
        }
    });
})();