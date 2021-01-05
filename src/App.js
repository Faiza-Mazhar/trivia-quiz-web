import "./App.css";
import { Route, Switch } from "react-router-dom";

import Header from "./Containers/Header/header";
import Homepage from "./Pages/home/homepage";
import SignInAndSignUpPage from "./Pages/signin-signup/signin-signup";
import LeaderBoard from "./Pages/leaderboard/leaderboard";
import Sidebar from "./Containers/sidebar/sidebar";
function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Switch>
        <Route path="/signin" exact component={SignInAndSignUpPage} />
        <Route path="/leaderboard" exact component={LeaderBoard} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
