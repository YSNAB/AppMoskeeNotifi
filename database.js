import firebase from 'firebase/app'
import 'firebase/database'

import Constants from 'expo-constants';


// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  databaseURL: Constants.manifest.extra.databaseUrl,
  projectId: Constants.manifest.extra.projectId,
  //messagingSenderId: 'sender-id',
  //appId: 'app-id',
  //measurementId: 'G-measurement-id',
};



function InitApp() {
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
}

//returns order by wrong order. But corrected in mapping my messages.js
async function ReadAllMessages() {
  return (firebase
    .database()
    .ref('/messages')
    .orderByChild("timestamp")
    .once('value'));
    
} 

export { InitApp, ReadAllMessages }