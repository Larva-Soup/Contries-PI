import { Route, Switch, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import { Detail, Form, Home, Landing } from "./views";

function App() {
  const location = useLocation();
  return (
    <>
      <div className="App">
        <h1>Henry Countries</h1>
      </div>
      {location.pathname !== "/" && <Navbar />}

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/create">
          <Form />
        </Route>
        <Route path="/detail">
          <Detail />
        </Route>
      </Switch>
    </>
  );
}

export default App;
