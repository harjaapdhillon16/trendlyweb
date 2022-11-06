import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Landing, TicketQRPage, EventBooking, Download } from "./pages";

const Loading = () => (
  <div className="bg-black w-screen h-screen text-white text-center">
    <p className="text-4xl pt-[40vh]">Trendly</p>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/events/:id" component={EventBooking} />
          <Route exact path="/tickets/:id" component={TicketQRPage} />
          <Route exact path="/download" component={Download} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Suspense>
  );
}
