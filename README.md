# BelimoWise

Check in real-time which hotels are successfully operating sustainably and book your stay with confidence. With Belimo IoT devices installed in numerous hotels, our product provides live sustainability insights on Booking.com, ensuring future guests know which hotels are on track. This incentivizes hotels to showcase their climate-friendly efforts while giving eco-conscious travelers peace of mind. By monitoring heating and cooling processes, Belimo devices offer accurate and transparent feedback on sustainable operations.

## tldr

The integration on booking.com scans hotel names, sends them to a database, from where the Dashboard will return calculated score data. The Tampermonkey script will then reveal the sustainable operating hotels with a "care"-icon next to the title.

## BelimoWise Integration with booking.com

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
ctrl+s / cmd+s to save. The script will be then activated. 

Head to booking.com to see it work by searching for St Gallen (for example) as destination.


## BelimoWise Dashboard
Dashboard: https://starthack2025.web.app/

