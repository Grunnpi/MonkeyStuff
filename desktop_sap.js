// ==UserScript==
// @name        desktop_sap.js
// @version     0.6
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
    sap.ui.require(["sap/ui/model/odata/v2/ODataModel"], function(ODataModel) {
    if (ODataModel) {
            // Sauvegarder la méthode originale
            const originalCallFunction = ODataModel.prototype.callFunction;

            // Encapsuler la méthode originale
            ODataModel.prototype.callFunction = function(sPath, mParameters) {
                console.log('Avant la méthode callFunction');
                const originalSuccess = mParameters.success;

                if ( sPath === "/GetUserData" ) {
                  console.log(mParameters)

                 // Redéfinir la fonction success
                 mParameters.success = function(oResult) {
                     console.log('Avant la fonction success');
                     console.log(oResult)

                       oResult.GetUserData.IsBureauEnabled = "X"
                       oResult.GetUserData.IsMedicalEnabled = "X"


                     // Ajoutez ici le code supplémentaire ou modifié
                     originalSuccess.apply(this, arguments);
                     console.log('Après la fonction success');
                 };
                }

                 // Appeler la méthode originale callFunction avec les paramètres modifiés
                 return originalCallFunction.apply(this, arguments);
                 console.log('Après la méthode callFunction');
            };
        } else {
            console.error('Le module sap/ui/model/odata/v2/ODataModel n\'est pas défini.');
        }
    });
})();