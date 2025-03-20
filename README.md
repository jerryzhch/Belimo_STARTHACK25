# BelimoWise

Check in realtime which hotels are succesfully run sustainably and book your next stay there. With the help of Belima IOT devices installed in numerous hotels our product will inform the future guest live on booking.com on which hotel is on track of sustainabilty. It gives them the incentive to showcase their hard work in contributing to a more climate-friendly operation. And aware travellers will be sure that they are residing in a good place.
As the Belimo devices track the heating and cooling processes around the building, it will allow for an accurate feedback. 

## Framework7 CLI Options

Framework7 app created with following options:

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

Install the browser extension "Tampermonkey". Create a new script and replace everything with following:
```
// ==UserScript==
// @name         Firebase Access on Booking.com
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Connect Booking.com to Firebase
// @match        *://www.booking.com/*
// @grant        GM_addElement
// @require      file:///Users/jeremiah.agboola/Documents/GitHub/Belimo_STARTHACK25/src/tamper.js
// ==/UserScript==
```
This will allow the intergration to booking.com to work



## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production

## Live
Dashboard: https://starthack2025.web.app/
