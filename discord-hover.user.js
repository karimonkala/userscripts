// ==UserScript==
// @name         Discord channel hover yellow text
// @namespace    http://tampermonkey.net/
// @version      2026-11-09
// @description  Make channel name text yellow when hovering over it in the channel list
// @author       You
// @match        https://discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css = `
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
