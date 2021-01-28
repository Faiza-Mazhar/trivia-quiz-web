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

  auth.onAuthStateChanged(async (userAuth) => {
    if (!userAuth) {
      return;
    }
    await createUserProfileDocument(userAuth);
  });
};

const signOut = () => auth.signOut();

const signInWithEmailAndPassword = async (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const signUpWithEmailAndPassword = async ({ email, password, displayName }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  await createUserProfileDocument({ ...user, displayName });
};

const getUserReferences = (id) => fireStore.doc(`/users/${id}`);

const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) {
    return;
  }

  const userReference = getUserReferences(userAuth.uid);
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

const getCurrentUserName = async (setCurrentUser) => {
  auth.onAuthStateChanged(async (userAuth) => {
    if (!userAuth) {
      setCurrentUser(undefined);
      return;
    }
    setCurrentUser(userAuth.displayName);
  });
};

const setUserScore = async ({ category, score, totalQuestions }) => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) return;
  let userId = currentUser.uid;
  const userReference = getUserReferences(userId);

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
  let userId = currentUser.uid;
  const userReference = getUserReferences(userId);

  const snapshot = await userReference.get();

  if (!snapshot.exists) {
    console.log("No such document!");
  } else {
    return snapshot.data().scores;
  }
};

export {
  signOut,
  setUserScore,
  getUserScores,
  getCurrentUserName as getCurrentUser,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
};
