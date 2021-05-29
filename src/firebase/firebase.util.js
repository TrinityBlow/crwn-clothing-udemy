import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

  const config = {
    apiKey: "AIzaSyCAcm-lQTjz6Z_sqPCRewX8kKqry_D64z8",
    authDomain: "crwn-db-udemy-7653c.firebaseapp.com",
    projectId: "crwn-db-udemy-7653c",
    storageBucket: "crwn-db-udemy-7653c.appspot.com",
    messagingSenderId: "447243340932",
    appId: "1:447243340932:web:7892f8997ac56d961006d1",
    measurementId: "G-QQD9W56MNG"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot.exists);

    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      } catch (error){
        console.log('error creating user', error.message);
      }

    }

    return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;