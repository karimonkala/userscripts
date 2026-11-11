// ==UserScript==
// @name         Discord channel hover yellow text
// @namespace    http://tampermonkey.net/
// @version      2026-11-11
// @description  Make channel name text yellow when hovering over it in the channel list
// @author       You
// @match        https://discord.com/*
// @match        https://*.discord.com/*
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @updateURL    https://raw.githubusercontent.com/karimonkala/userscripts/main/discord-hover.user.js
// @downloadURL  https://raw.githubusercontent.com/karimonkala/userscripts/main/discord-hover.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Separate rules so one unsupported selector can't invalidate the others.
    const css = `
        /* Primary: stable data attribute on channel rows */
        [data-list-item-id^="channels___"]:hover [class*="name_"],
        [data-list-item-id^="channels___"]:hover [class*="name_"] * {
            color: yellow !important;
        }

        /* Row hovered via the wrapping li */
        li:has([data-list-item-id^="channels___"]):hover [class*="name_"],
        li:has([data-list-item-id^="channels___"]):hover [class*="name_"] * {
            color: yellow !important;
        }

        /* Fallback: older hashed class names */
        li[class*="containerDefault"]:hover [class^="name_"],
        li[class*="containerDefault"]:hover [class*=" name_"],
        li[class*="containerDefault"]:hover [class^="name_"] *,
        li[class*="containerDefault"]:hover [class*=" name_"] * {
            color: yellow !important;
        }
    `;

    const style = document.createElement('style');
    style.id = 'tm-channel-hover-yellow';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
})();
