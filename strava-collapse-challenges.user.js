// ==UserScript==
// @name         Collapse "Joined a Challenge" Entries on Strava
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Collapse entries that contain "joined a challenge" on Strava, with expand/collapse toggle functionality.
// @author       You
// @match        https://www.strava.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function collapseChallengeJoins() {
        const entries = document.querySelectorAll('[data-testid="web-feed-entry"]');

        entries.forEach((entry, index) => {
            const groupHeader = entry.querySelector('[data-testid="group-header"]');
            if (groupHeader && groupHeader.innerText.toLowerCase().includes('joined a challenge')) {
                if (entry.dataset.processed === "true") return; // Avoid reprocessing
                entry.dataset.processed = "true";

                // Create toggle button
                const toggleButton = document.createElement('button');
                toggleButton.textContent = 'Show Challenge Entry';
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
                    toggleButton.textContent = isHidden ? 'Hide Challenge Entry' : 'Show Challenge Entry';
                });

                // Insert toggle and content
                entry.appendChild(toggleButton);
                entry.appendChild(contentWrapper);
            }
        });
    }

    // Observe DOM changes to catch dynamically loaded entries
    const observer = new MutationObserver(collapseChallengeJoins);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run
    collapseChallengeJoins();
})();
