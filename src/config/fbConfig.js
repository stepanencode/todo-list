import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

  // Initialize Firebase
var config = {
  apiKey: "AIzaSyB7xbSVerXFsoVWsCuyjWPjFDOpx9ck8ws",
  authDomain: "todo-list-d032f.firebaseapp.com",
  databaseURL: "https://todo-list-d032f.firebaseio.com",
  projectId: "todo-list-d032f",
  storageBucket: "todo-list-d032f.appspot.com",
  messagingSenderId: "835568764537"
};

firebase.initializeApp(config);

firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
