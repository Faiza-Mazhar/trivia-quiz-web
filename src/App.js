import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HeaderComponent from "./Components/Header/header";
import Homepage from "./pages/home/homepage";
import SignInAndSignUpPage from "./pages/signin-signup/signin-signup";
import LeaderBoard from "./pages/leaderboard/leaderboard";

import { getCurrentUserName } from "./firebase/firebase.utils";

function App() {
  const [userName, setCurrentUserName] = useState(undefined);

  useEffect(() => {
    !userName && getCurrentUserName(setCurrentUserName);
  }, [userName]);
  return (
    <div className="App">
      <HeaderComponent
        userName={userName}
        setCurrentUser={setCurrentUserName}
      />
      <Switch>
        <Route
          path="/signin"
          exact
          render={() =>
            !userName ? <SignInAndSignUpPage /> : <Redirect to="/" />
          }
        />
        <Route path="/leaderboard" exact component={LeaderBoard} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
