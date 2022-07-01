import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Landing, EventBooking } from "./pages";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/events/:id" component={EventBooking} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
