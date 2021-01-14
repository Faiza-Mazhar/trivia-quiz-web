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

const getCurrentUserId = (setUserId) => {
  firebase.auth().onAuthStateChanged((user) => setUserId(user.uid));
};

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
      await userReference.set({ displayName, email, createdAt, scores: [] });
    } catch (error) {
      console.log("Error created users: ", error.message);
    }
  }

  return userReference;
};

const setUserScore = async ({
  currentUserId,
  category,
  score,
  totalQuestions,
}) => {
  if (!currentUserId) {
    return;
  }

  const userReference = fireStore.doc(`/users/${currentUserId}`);
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

const getUserScores = async (userId) => {
  if (!userId) {
    return;
  }

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
  firebase,
  getCurrentUserId,
};
