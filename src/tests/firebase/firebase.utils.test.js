import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
import { getCurrentUser } from "../../firebase/firebase.utils";

const mockUserCredential = {
  user: {},
};

const docResult = {
  data: () => {
    "MOCK_DATA";
  },
};

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  auth: jest.fn().mockImplementation(() => {}),
  currentUser: {
    email: "test@test.com",
    emailVerified: true,
  },
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(() => userCredentialMock),

  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),

  firestore: () => ({
    doc: jest.fn(() => ({
      get: jest.fn(() => docResult),
      set: jest.fn(),
    })),
  }),
}));

const setSpy = jest.spyOn(firebase.firestore().doc(), "set");

test.only("getCurrentUser gets the add the credentials of the user to firestore", () => {
  const userAuth = {
    displayName: "test name",
    email: "test@test.com",
  };

  getCurrentUser(userAuth);

  expect(setSpy).toHaveBeenCalled();
});
