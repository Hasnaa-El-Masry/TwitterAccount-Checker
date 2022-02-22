import { Route, Switch, Redirect } from "react-router-dom";

import { AuthProvider } from "./AuthContext/authContext";

import Navbar from "./components/Navbar";
import AuthMiddleware from "./Middleware/AuthMiddleware";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

function App() {

  return (
    <AuthProvider>
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <AuthMiddleware component={Welcome} path="/welcome" />

        <Route path="/" render={() => <Redirect to="/welcome" />} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
