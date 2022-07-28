import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Landing = React.lazy(() => import("./pages/landing"));
const EventBooking = React.lazy(() => import("./pages/eventBooking"));
const TicketQRPage = React.lazy(() => import("./pages/ticketQRPage"));

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
          <Redirect to="/" />
        </Switch>
      </Router>
    </Suspense>
  );
}
