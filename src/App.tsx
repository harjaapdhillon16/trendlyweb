import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  Landing,
  TicketQRPage,
  EventBooking,
  Download,
  TermsAndConditions,
  PrivacyPolicy,
  Venue,
  CancellationPolicy,
} from "./pages";

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
          <Route exact path="/venue/:id" component={Venue} />
          <Route
            exact
            path="/terms-and-conditions"
            component={TermsAndConditions}
          />
          <Route
            exact
            path="/cancellation-policy"
            component={CancellationPolicy}
          />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Suspense>
  );
}
