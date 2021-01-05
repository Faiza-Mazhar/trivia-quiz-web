import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Containers/Header/header";
import Homepage from "./pages/home/homepage";
import SignInAndSignUpPage from "./pages/signin-signup/signin-signup";
import LeaderBoard from "./pages/leaderboard/leaderboard";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/signin" component={SignInAndSignUpPage} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/" exact component={Homepage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
