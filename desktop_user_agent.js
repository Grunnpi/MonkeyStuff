// ==UserScript==
// @name        desktop_user_agent
// @version     0.1
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @author      Pierre
// @description  Force the User-Agent to simulate a desktop browser
// @match        *://*/*
// @run-at       document-start
// ==/UserScript==
(function() {
    'use strict';

    // Définir le User-Agent souhaité
    var desktopUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36";

    // Redéfinir la propriété navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
        get: function() {
            return desktopUserAgent;
        }
    });

    // Redéfinir la propriété navigator.appVersion
    Object.defineProperty(navigator, 'appVersion', {
        get: function() {
            return desktopUserAgent;
        }
    });

    // Redéfinir la propriété navigator.platform
    Object.defineProperty(navigator, 'platform', {
        get: function() {
            return "Win32";
        }
    });
})();