import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HeaderComponent from "./Components/Header/header";
import Homepage from "./pages/home/homepage";
import SignInAndSignUpPage from "./pages/signin-signup/signin-signup";
import LeaderBoard from "./pages/leaderboard/leaderboard";

import { auth, getCurrentUser } from "./firebase/firebase.utils";

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: undefined,
    displayName: undefined,
    email: undefined,
    createdAt: undefined,
  });

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      if (userAuth && !currentUser.id) {
        getCurrentUser(userAuth, setCurrentUser);
      }
    });
    return () => unsubscribeFromAuth();
  }, [currentUser]);

  return (
    <div className="App">
      <HeaderComponent
        userName={currentUser.displayName}
        setCurrentUser={setCurrentUser}
      />
      <Switch>
        <Route
          path="/signin"
          exact
          render={() =>
            !currentUser.id ? <SignInAndSignUpPage /> : <Redirect to="/" />
          }
        />
        <Route path="/leaderboard" exact component={LeaderBoard} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
