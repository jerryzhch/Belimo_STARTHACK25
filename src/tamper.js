// ==UserScript==
// @name         Firebase Access on Booking.com
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Connect Booking.com to Firebase
// @match        *://www.booking.com/*
// @grant        GM_addElement
// ==/UserScript==

(function () {
  "use strict";
  // Create overlay element
  let overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(211, 211, 211, 0.9)"; // Light grey with transparency
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";

  // Create text element
  let text = document.createElement("div");
  text.innerText = "BelimoWise analyzing";
  text.style.color = "green";
  text.style.fontSize = "24px";
  text.style.fontWeight = "bold";

  // Append text to overlay
  overlay.appendChild(text);
  document.body.appendChild(overlay);

  // Inject Firebase SDK
  const script = document.createElement("script");
  script.className = "check the bog";
  script.src = "https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js";
  script.onload = () => {
    const dbScript = document.createElement("script");
    dbScript.src =
      "https://www.gstatic.com/firebasejs/8.7.0/firebase-database.js";
    dbScript.onload = initFirebase;
    document.body.appendChild(dbScript);
  };
  document.body.appendChild(script);

  function initFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyDSUPgmdfMjXaxCtsevRJK165FaOLDA6RI",
      authDomain: "starthack2025.firebaseapp.com",
      databaseURL:
        "https://starthack2025-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "starthack2025",
      storageBucket: "starthack2025.firebasestorage.app",
      messagingSenderId: "438414179401",
      appId: "1:438414179401:web:7cf2b10966cfdbf4871398",
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    let hotels = [];
    let hotelObject = [];

    // Capture and store hotel names from search results
    setTimeout(() => {
      overlay.remove();
      document.querySelectorAll('[data-testid="title"]').forEach((el) => {
        const hotelName = el.textContent.trim();
        hotels.push(hotelName);
        el.className += " " + hotelName;
        hotelObject.push(el);
      });

      if (hotels.length > 0) {
        console.log("Hotels Found:", hotels);
        database.ref("/hotelNames").set(hotels);

        database.ref("/hotelScoreRef").on("value", (snap) => {
          snap
            .val()
            .sort((a, b) => b.score - a.score)
            .forEach((i, index) => {
              console.log(i.score);
              hotelObject.find(
                (h) => h && h.className.includes(i.label)
              ).innerHTML =
                '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNl1iSuJxamUanf3TnC42OMUQeKBk-Bnk7Q&s" width="35px"  title="Very sustainable hotel (powered by BelimoWise)"/>' +
                "  " +
                i.label +
                " (belimowise-ranking: " +
                (index + 1) +
                ")";
            });
        });
      }
    }, 2000); // Adjust delay if necessary
  }
})();
