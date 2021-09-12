import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Designations from "./pages/Designations";
import Employees from "./pages/Employees";
import EmployeeEdit from "./component/Modal/EmployeeEdit";
import { CssBaseline, createTheme, ThemeProvider } from "@material-ui/core";
import AddDesignations from "./pages/AddDesignations";
import AddEmployees from "./pages/AddEmployees";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import DesignationEdit from "./component/Modal/DesignationEdit";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
      paper: "#fff",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

function App() {
  const storagetkn = JSON.parse(localStorage.getItem("loginUser")) && true;
  console.log("storagetkn", storagetkn);

  const [token, setToken] = useState(false);

  const login = (tkn) => {
    setToken(tkn);
  };

  const logout = () => {
    setToken(false);
  };

  let isLogged;

  if (token || storagetkn) {
    isLogged = true;
  } else {
    isLogged = false;
  }

  console.log("token", isLogged);
  let routes;
  if (isLogged) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/employees">
          <Employees />
        </Route>
        <Route exact path="/designations">
          <Designations />
        </Route>
        <Route path="/designations/create">
          <AddDesignations />
        </Route>
        <Route path="/employees/create">
          <AddEmployees />
        </Route>
        <Route path="/employees/:id/edit">
          <EmployeeEdit />
        </Route>
        <Route path="/designations/:id/edit">
          <DesignationEdit />
        </Route>
        <Route>
          <Redirect from="*" to="/" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/register">
          {isLogged ? <Redirect to="/login" /> : <Register />}
        </Route>
        <Route path="/login">
          <Login login={login} />
        </Route>
        <Route>
          <Redirect from="*" to="/login" />
        </Route>
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Header user={isLogged} logout={logout} />
      <Switch>{routes}</Switch>

      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
