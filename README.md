# BelimoWise

Check in real-time which hotels are successfully operating sustainably and book your stay with confidence. With Belimo IoT devices installed in numerous hotels, our product provides live sustainability insights on Booking.com, ensuring future guests know which hotels are on track. This incentivizes hotels to showcase their climate-friendly efforts while giving eco-conscious travelers peace of mind. By monitoring heating and cooling processes, Belimo devices offer accurate and transparent feedback on sustainable operations.

## Framework7 CLI Options

Framework7 app created with following options:

## Install Dependencies

Install the browser extension "Tampermonkey". Create a new script and replace everything with following:
```
// ==UserScript==
// @name         Firebase Access on Booking.com
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Connect Booking.com to Firebase
// @match        *://www.booking.com/*
// @grant        GM_addElement
// @require      https://raw.githubusercontent.com/jerryzhch/Belimo_STARTHACK25/refs/heads/main/src/tamper.js
// ==/UserScript==
```
This will allow the intergration to booking.com to work


## Live
Dashboard: https://starthack2025.web.app/
