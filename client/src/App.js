/* eslint-disable*/
import {Chat} from "./component/socket";
import "./index.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {Home} from "./component/home";
import {Profile} from "./component/profile";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          exact
          path="/profile"
          render={(p) => <Profile {...p} />}
        />
        <Route
          exact
          path="/chat"
          render={(p) => <Chat {...p} />}
        />
      </Switch>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Router>
  );
}

export default App;
