import "./App.css";
import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HeaderComponent from "./Components/Header/header";
import Homepage from "./pages/home/homepage";
import SignInAndSignUpPage from "./pages/signin-signup/signin-signup";
import LeaderBoard from "./pages/leaderboard/leaderboard";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: undefined,
    displayName: undefined,
    email: undefined,
    createdAt: undefined,
  });

  console.log(currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth && !currentUser.id) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          if (snapshot.exists) {
            const data = {
              ...currentUser,
              id: snapshot.id,
              ...snapshot.data(),
            };

            setCurrentUser(data);
          }
        });
      }
    });
  }, [currentUser]);

  return (
    <div className="App">
      <HeaderComponent
        userName={currentUser.displayName}
        isUserSignedIn
        setCurrentUser={setCurrentUser}
      />
      <Switch>
        <Route path="/signin" exact component={SignInAndSignUpPage} />
        <Route path="/leaderboard" exact component={LeaderBoard} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
