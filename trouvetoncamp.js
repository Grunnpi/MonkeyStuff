// ==UserScript==
// @name        trouvetoncamp.js
// @version     0.1
// @namespace   https://github.com/Grunnpi/MonkeyStuff
// @description full details for trouvetoncamp
// @match       https://trouvetoncamp.fr/annonces/view
// @match       https://trouvetoncamp.fr/campaccomps/view
// @icon        https://cdn.simpleicons.org/freecodecamp/green
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';

    console.log("run me");

    // URL de base de l'API REST
    const apiUrl = 'https://trouvetoncamp.fr/annonces/read/';

    // Fonction pour faire l'appel REST et obtenir les données pour une ligne spécifique
    async function fetchDataForRow(rowId) {
        try {
            const response = await fetch(`${apiUrl}${rowId}`);
            const html = await response.text();
            return html;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return 'Erreur';
        }
    }

    // Fonction pour extraire la valeur du champ "Présentation de la maîtrise"
    function extractXPATH(html, xpath) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const result = doc.evaluate(xpath, doc, null, XPathResult.STRING_TYPE, null);
        return result.stringValue.trim();
    }

    function selectElementByXPath(xpath) {
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    }

    // Fonction pour supprimer les retours chariot et les balises de style dans le tableau
    function cleanTableCells(table) {
        const cells = table.querySelectorAll('td, th');
        cells.forEach(cell => {
            cell.innerHTML = cell.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/\n/g, ' ').replace(/<[^>]+>/g, '');
        });
    }

    // Fonction pour ajouter une colonne à la table
    function addColumnToTable() {
        const table = document.querySelector('table'); // Sélectionnez votre table ici
        if (!table) return;


        // Fonction pour sélectionner un élément en utilisant XPath

        // XPath de l'en-tête de la table à modifier
        const xpath = '//*[@id="main"]/div/table[1]/tbody/tr/th[2]';

        // Sélectionner l'en-tête de la table en utilisant XPath
        const header = selectElementByXPath(xpath);

        // Vérifier si l'en-tête existe et le modifier
        if (header) {
            header.innerHTML = 'Groupe, Territoire, Ville';
        }

        var newHeader;
        // Ajouter l'en-tête de la nouvelle colonne
        const headerRow = table.querySelector('tr');

        newHeader = document.createElement('th');
        newHeader.textContent = 'Maitrise';
        headerRow.appendChild(newHeader);

        newHeader = document.createElement('th');
        newHeader.textContent = 'Jeunes';
        headerRow.appendChild(newHeader);

        newHeader = document.createElement('th');
        newHeader.textContent = 'Période';
        headerRow.appendChild(newHeader);

        newHeader = document.createElement('th');
        newHeader.textContent = 'Etat projet';
        headerRow.appendChild(newHeader);

        newHeader = document.createElement('th');
        newHeader.textContent = 'Motivations';
        headerRow.appendChild(newHeader);

        // Ajouter les données à chaque ligne du tableau
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(async (row) => {
            const aRef = row.querySelector('a');
            if (aRef) {
                const rowId = row.querySelector('a').getAttribute('href').split('/').pop(); // Supposons que l'ID est dans l'URL du lien
                console.log("recup rowId = " + rowId);
                const html = await fetchDataForRow(rowId);
                var xpath, newCell, newValue;
                if (html) {
                    // maîtrise
                    newCell = document.createElement('td');
                    xpath = '//*[@id="main"]/div/table[3]/tbody/tr[7]/td[1]/text()';
                    newValue = extractXPATH(html, xpath);
                    newCell.textContent = newValue || 'N/A'; // Remplir avec les données ou 'N/A' si pas de données
                    row.appendChild(newCell);

                    // jeunes
                    newCell = document.createElement('td');
                    xpath = '//*[@id="main"]/div/table[4]/tbody/tr[6]/td[1]';
                    newValue = extractXPATH(html, xpath);
                    newCell.textContent = newValue || 'N/A'; // Remplir avec les données ou 'N/A' si pas de données
                    row.appendChild(newCell);

                    // période
                    newCell = document.createElement('td');
                    xpath = '//*[@id="main"]/div/table[5]/tbody/tr[3]/td[1]/text()';
                    newValue = extractXPATH(html, xpath);
                    console.log(newValue);
                    newCell.textContent = newValue || 'N/A'; // Remplir avec les données ou 'N/A' si pas de données
                    row.appendChild(newCell);

                    // etat
                    newCell = document.createElement('td');
                    xpath = '//*[@id="main"]/div/table[6]/tbody/tr/td[1]/text()';
                    newValue = extractXPATH(html, xpath);
                    console.log(newValue);
                    newCell.textContent = newValue || 'N/A'; // Remplir avec les données ou 'N/A' si pas de données
                    row.appendChild(newCell);

                    // motivations
                    newCell = document.createElement('td');
                    xpath = '//*[@id="main"]/div/table[7]/tbody/tr/td[1]/text()';
                    newValue = extractXPATH(html, xpath);
                    console.log(newValue);
                    newCell.textContent = newValue || 'N/A'; // Remplir avec les données ou 'N/A' si pas de données
                    row.appendChild(newCell);
                }
            } else {
                console.debug("ligne vide");
            }
        });

        // Supprimer les retours chariot et les balises de style dans le tableau
        cleanTableCells(table);

    }

    // Exécuter le script
    addColumnToTable();
})();