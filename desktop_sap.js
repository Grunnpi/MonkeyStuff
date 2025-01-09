// ==UserScript==
// @name        desktop_sap.js
// @version     0.16
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description  Force SAP JavaScript to return desktop mode
// @match        *://*/*myrh*
// @icon        https://cdn.simpleicons.org/bilibili/pink
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';

    // Créer le footer
    const footer = document.createElement('div');
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.width = '95%';
    footer.style.backgroundColor = '#333';
    footer.style.color = '#fff';
    footer.style.fontFamily = 'monospace';
    footer.style.padding = '10px';
    footer.style.zIndex = '1000';
    footer.style.overflowY = 'auto';
    footer.style.maxHeight = '150px';
    document.body.appendChild(footer);

    // Créer le conteneur pour les logs
    const logContainer = document.createElement('div');
    footer.appendChild(logContainer);

    // Créer le bouton Clear
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.style.position = 'fixed';
    clearButton.style.right = '10px';
    clearButton.style.bottom = '10px';
    clearButton.style.backgroundColor = '#444';
    clearButton.style.color = '#fff';
    clearButton.style.border = 'none';
    clearButton.style.padding = '5px 10px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.zIndex = '1001'; // Assurez-vous que le bouton est au-dessus du footer
    document.body.appendChild(clearButton);

    // Fonction pour ajouter un log
    function addLog(message) {
        const log = document.createElement('div');
        log.textContent = message;
        logContainer.appendChild(log);
        footer.scrollTop = footer.scrollHeight; // Défilement automatique vers le bas
    }

    // Fonction pour ajouter une erreur
    function addError(message) {
        const error = document.createElement('div');
        error.textContent = message;
        error.style.color = 'red';
        logContainer.appendChild(error);
        footer.scrollTop = footer.scrollHeight; // Défilement automatique vers le bas
    }

    // Événement pour le bouton Clear
    clearButton.addEventListener('click', () => {
        logContainer.innerHTML = '';
    });

    // Exemple d'utilisation
    addLog('** script started');

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

                if (mParameters) {
                    var K = mParameters.groupId || mParameters.batchGroupId;
                    var N = mParameters.changeSetId;
                    var J = mParameters.method ? mParameters.method : "GET";
                    var G = Object.assign({}, mParameters.urlParameters);
                    var V = mParameters.eTag;
                    var S = mParameters.success;
                    var I = mParameters.error;
                    var T = mParameters.headers;
                    var b1 = mParameters.refreshAfterChange;

                    console.log("Headers")
                    console.log(T)
                  }
                
                  console.log("mParameters")
                  console.log(mParameters)
                  console.log("arguments")
                  console.log(arguments)

                  addLog('GetUserData.override');

                 // Redéfinir la fonction success
                 mParameters.success = function(oResult) {
                     addLog('* GetUserData.success-before');
                     console.log(oResult)

                     addLog('[' + oResult.GetUserData.Admin + '][' + oResult.GetUserData.Ename + '][' + oResult.GetUserData.UserId + ']');

                     oResult.GetUserData.IsBureauEnabled = "X"
                     oResult.GetUserData.IsMedicalEnabled = "X"

                     // Ajoutez ici le code supplémentaire ou modifié
                     originalSuccess.apply(this, arguments);
                     addLog('* GetUserData.success-after');
                 };

                 mParameters.error = function(oError) {
                      addError('* GetUserData.error-before');
                      console.log(oError)

                      var oFunctError = JSON.parse(oError.responseText);
                      addError(oFunctError)

                      originalError.apply(this, arguments);
                      addError('* GetUserData.error-after');
                  };
                }

                 //addLog('callFunction[' + sPath + ']-after');

                 // Appeler la méthode originale callFunction avec les paramètres modifiés
                 originalCallFunction.apply(this, arguments);
            };
        } else {
            addError('module sap/ui/model/odata/v2/ODataModel not defined');
        }
    });
})();