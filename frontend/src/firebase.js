import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyCipWq7jA4ISlW6GDybGS6xh1dAy8UIfeQ",

  authDomain: "finance-7291f.firebaseapp.com",

  projectId: "finance-7291f",

  storageBucket: "finance-7291f.firebasestorage.app",

  messagingSenderId: "308107554299",

  appId: "1:308107554299:web:4d98223274c624f6a6ef5e",

  measurementId: "G-1Y0C6FKGSL"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);