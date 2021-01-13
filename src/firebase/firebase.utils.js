import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2MPd6if-SORKEnBlbOO1rpQHxyD4pC4k",
  authDomain: "trivia-quiz-35a66.firebaseapp.com",
  projectId: "trivia-quiz-35a66",
  storageBucket: "trivia-quiz-35a66.appspot.com",
  messagingSenderId: "1060181821141",
  appId: "1:1060181821141:web:57d3089d7972b3d4ef445c",
  measurementId: "G-Y1JV0SLE4T",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fireStore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = () => auth.signInWithPopup(provider);

const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) {
    return;
  }

  const userReference = fireStore.doc(`/users/${userAuth.uid}`);
  const snapshot = await userReference.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userReference.set({ displayName, email, createdAt });
    } catch (error) {
      console.log("Error created users: ", error.message);
    }
  }

  return userReference;
};

export { auth, fireStore, signInWithGoogle, createUserProfileDocument };
