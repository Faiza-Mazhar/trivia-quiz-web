import "./App.css";
import { Route, Switch } from "react-router-dom";

import Header from "./Containers/Header/header";
import Homepage from "./pages/home/homepage";
import SignInAndSignUpPage from "./pages/signin-signup/signin-signup";
import LeaderBoard from "./pages/leaderboard/leaderboard";
import MainContainer from "./Containers/main-container/main-container";
function App() {
  return (
    <div className="App">
      <Header />
      <MainContainer />
      <Switch>
        <Route path="/signin" exact component={SignInAndSignUpPage} />
        <Route path="/leaderboard" exact component={LeaderBoard} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
