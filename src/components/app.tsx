import React, { useState, useEffect, createContext } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import routes from '../js/routes';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import firebaseConfig from '../js/firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
export const FB_DATABASE = createContext(db);
export const FB_AUTH = createContext(auth);

import {
  f7,
  f7ready,
  App,
  View,
} from 'framework7-react';



const MyApp = () => {


  // Framework7 Parameters
  const f7params = {
    name: 'BelimoWise', // App name
      theme: 'ios', // Automatic theme detection

      darkMode: true,

      // App routes
      routes: routes,
  };

  f7ready(() => {


    // Call F7 APIs here
  });

  return (
    <FB_AUTH.Provider value={auth}>
      <FB_DATABASE.Provider value={db}>
        <App { ...f7params }>

            {/* Your main view, should have "view-main" class */}
            <View main className="safe-areas" url="/" />

        </App>
      </FB_DATABASE.Provider>
    </FB_AUTH.Provider>
  );
}
export default MyApp;