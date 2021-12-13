import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD_PV5KdzRhd6JsKICqS1cZ7XDok8Xd-Do",
    authDomain: "teamhackaton-auth.firebaseapp.com",
    projectId: "teamhackaton-auth",
    storageBucket: "teamhackaton-auth.appspot.com",
    messagingSenderId: "117610590425",
    appId: "1:117610590425:web:7fee2dc8acf52942330ec8"
  };

const fire = firebase.initializeApp(firebaseConfig);

export const googleAcc = getAuth(fire);
export default fire;