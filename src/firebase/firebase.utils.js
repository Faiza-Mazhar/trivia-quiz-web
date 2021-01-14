import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
import firebaseConfig from "./firebase_config";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fireStore = firebase.firestore();

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  auth.signInWithPopup(provider);
};

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
      await userReference.set({ displayName, email, createdAt, scores: [] });
    } catch (error) {
      console.log("Error created users: ", error.message);
    }
  }

  return userReference;
};

const setUserScore = async ({ category, score, totalQuestions }) => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) return;

  let userId = currentUser.uid;

  const userReference = fireStore.doc(`/users/${userId}`);
  const data = {
    category: category,
    score: `${score}/${totalQuestions}`,
  };
  try {
    await userReference.update({
      scores: firebase.firestore.FieldValue.arrayUnion(data),
    });
  } catch (error) {
    console.log("Error created users: ", error.message);
  }
};

const getUserScores = async () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) return;

  console.log("here");
  let userId = currentUser.uid;

  const userReference = fireStore.doc(`/users/${userId}`);
  const user = await userReference.get();
  if (!user.exists) {
    console.log("No such document!");
  } else {
    return user.data().scores;
  }
};

export {
  auth,
  fireStore,
  signInWithGoogle,
  createUserProfileDocument,
  setUserScore,
  getUserScores,
};
