// ==UserScript==
// @name        desktop_sap.js
// @version     0.7
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description  Force SAP JavaScript to return desktop mode
// @match        *://*/*
// @icon        https://cdn.simpleicons.org/bilibili/pink
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';

    // Créer le footer
    const footer = document.createElement('footer');
    footer.id = 'logFooter';
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.width = '95%';
    footer.style.backgroundColor = '#333';
    footer.style.color = '#fff';
    footer.style.padding = '10px';
    footer.style.fontSize = '12px';
    footer.style.zIndex = '1000';
    footer.style.overflowY = 'auto';
    footer.style.maxHeight = '100px';

    // Ajouter le footer au body
    document.body.appendChild(footer);

    // Fonction pour ajouter des logs au footer
    function addLog(message) {
        const logMessage = document.createElement('div');
        logMessage.textContent = message;
        footer.appendChild(logMessage);
    }
    function addError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        footer.appendChild(errorMessage);
    }

    // Exemple d'utilisation
    addLog('Script démarré');

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
                addLog('Avant la méthode callFunction');
                const originalSuccess = mParameters.success;

                if ( sPath === "/GetUserData" ) {
                  console.log(mParameters)

                 // Redéfinir la fonction success
                 mParameters.success = function(oResult) {
                     addLog('Avant la fonction success');
                     console.log(oResult)

                       oResult.GetUserData.IsBureauEnabled = "X"
                       oResult.GetUserData.IsMedicalEnabled = "X"


                     // Ajoutez ici le code supplémentaire ou modifié
                     originalSuccess.apply(this, arguments);
                     addLog('Après la fonction success');
                 };
                }

                 // Appeler la méthode originale callFunction avec les paramètres modifiés
                 return originalCallFunction.apply(this, arguments);
                 addLog('Après la méthode callFunction');
            };
        } else {
            console.error('Le module sap/ui/model/odata/v2/ODataModel n\'est pas défini.');
            addError('Le module sap/ui/model/odata/v2/ODataModel n\'est pas défini.');
        }
    });
})();