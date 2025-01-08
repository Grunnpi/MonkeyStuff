// ==UserScript==
// @name        desktop_sap.js
// @version     0.9
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
        footer.scrollTop = footer.scrollHeight; // Auto-scroll vers le bas
    }
    function addError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        footer.appendChild(errorMessage);
        footer.scrollTop = footer.scrollHeight; // Auto-scroll vers le bas
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
                addLog('callFunction[' + sPath + ']-before');
                const originalSuccess = mParameters.success;
                const originalError = mParameters.error;

                if ( sPath === "/GetUserData" ) {
                  console.log(mParameters)

                  addLog('GetUserData.override');

                 // Redéfinir la fonction success
                 mParameters.success = function(oResult) {
                     addLog('GetUserData.success-before');
                     console.log(oResult)

                     oResult.GetUserData.IsBureauEnabled = "X"
                     oResult.GetUserData.IsMedicalEnabled = "X"

                     // Ajoutez ici le code supplémentaire ou modifié
                     originalSuccess.apply(this, arguments);
                     addLog('GetUserData.success-after');
                 };

                 mParameters.error = function(oError) {
                      addLog('GetUserData.error-before');
                      console.log(oError)

                      var oFunctError = JSON.parse(oError.responseText);
                      addError(oFunctError)

                      originalError.apply(this, arguments);
                      addLog('GetUserData.error-after');
                  };
                }

                 addLog('callFunction[' + sPath + ']-after');

                 // Appeler la méthode originale callFunction avec les paramètres modifiés
                 return originalCallFunction.apply(this, arguments);
            };
        } else {
            addError('module sap/ui/model/odata/v2/ODataModel not defined');
        }
    });
})();