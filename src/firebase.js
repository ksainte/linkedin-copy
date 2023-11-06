import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4zoEilsMqX6-TMHH1-Xz2Hfk03hu0NiY",
    authDomain: "linkedin-sonny-14543.firebaseapp.com",
    projectId: "linkedin-sonny-14543",
    storageBucket: "linkedin-sonny-14543.appspot.com",
    messagingSenderId: "1093687673407",
    appId: "1:1093687673407:web:3f5aba0f1a5d5d9d1b2e8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();