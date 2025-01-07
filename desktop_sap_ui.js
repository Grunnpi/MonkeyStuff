// ==UserScript==
// @name        desktop_sap_ui.js
// @version     0.2
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description  Force SAP JavaScript to return desktop mode
// @match        *://*/*
// @run-at       document-body
// ==/UserScript==
(function() {
    'use strict';

    // Fonction pour surcharger les attributs
    function overrideSAPUIAttributes() {
        var sapUiCore = document.querySelector('[data-sap-ui-browser]');
        if (sapUiCore) {
            sapUiCore.setAttribute('data-sap-ui-browser', 'cr90'); // Exemple pour Chrome 90 sur desktop
            sapUiCore.setAttribute('data-sap-ui-os', 'Windows10'); // Exemple pour Windows 10
            console.log('Attributs SAP UI surchargés :', sapUiCore);
        } else {
            console.log('Élément SAP UI non trouvé.');
        }
    }

    // Exécuter la fonction après le chargement de la page
    overrideSAPUIAttributes();
})();