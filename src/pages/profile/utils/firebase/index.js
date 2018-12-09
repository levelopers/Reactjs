import firebase from 'firebase/app'
import 'firebase/storage'
var config = {
    apiKey: "AIzaSyB7jZ4b9oGrP-UqlMvwWNm0Rypw0J9PC_w",
    authDomain: "bigfish-firebase.firebaseapp.com",
    databaseURL: "https://bigfish-firebase.firebaseio.com",
    projectId: "bigfish-firebase",
    storageBucket: "bigfish-firebase.appspot.com",
    messagingSenderId: "259028688259"
};
firebase.initializeApp(config);
const firebase_storage = firebase.storage()
export {
    firebase, firebase_storage as default
}