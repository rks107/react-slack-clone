import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDPOf8Roc8sQLi5FGmCIYAO-nLVSkwA__o',
  authDomain: 'react-slack-clone-2af34.firebaseapp.com',
  databaseURL: 'https://react-slack-clone-2af34.firebaseio.com',
  projectId: 'react-slack-clone-2af34',
  storageBucket: 'react-slack-clone-2af34.appspot.com',
  messagingSenderId: '1082651334329',
  appId: '1:1082651334329:web:250943747d57c81dff2d68',
  measurementId: 'G-15V3ZGD33D',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth =  firebase.auth();

export const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider);
}
