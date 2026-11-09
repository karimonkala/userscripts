// ==UserScript==
// @name         Collapse Zwift Activities on Strava
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Collapse entries that mention "Zwift" on Strava, with expand/collapse toggle functionality.
// @author       You
// @match        https://www.strava.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function collapseZwiftActivities() {
        const entries = document.querySelectorAll('[data-testid="web-feed-entry"]');

        entries.forEach((entry, index) => {
            if (entry.dataset.processed === "true") return;

            const text = entry.innerText.toLowerCase();
            if (text.includes('zwift')) {
                entry.dataset.processed = "true";

                // Create toggle button
                const toggleButton = document.createElement('button');
                toggleButton.textContent = 'Show Zwift Activity';
                toggleButton.style.margin = '10px';
                toggleButton.style.padding = '5px 10px';
                toggleButton.style.cursor = 'pointer';

                // Wrap the original content
                const contentWrapper = document.createElement('div');
                contentWrapper.style.display = 'none';
                while (entry.firstChild) {
                    contentWrapper.appendChild(entry.firstChild);
                }

                // Toggle logic
                toggleButton.addEventListener('click', () => {
                    const isHidden = contentWrapper.style.display === 'none';
                    contentWrapper.style.display = isHidden ? '' : 'none';
                    toggleButton.textContent = isHidden ? 'Hide Zwift Activity' : 'Show Zwift Activity';
                });

                // Insert toggle and content
                entry.appendChild(toggleButton);
                entry.appendChild(contentWrapper);
            }
        });
    }

    // Observe DOM changes to catch dynamically loaded entries
    const observer = new MutationObserver(collapseZwiftActivities);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run
    collapseZwiftActivities();
})();
