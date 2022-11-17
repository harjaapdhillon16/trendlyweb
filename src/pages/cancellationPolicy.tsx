import React from "react";
import { Footer } from "../components/Common/footer";
import { Header } from "../components/Common/header";

const CancellationPolicy = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 min-h-[100vh] w-full">
      <Header />
      <div className="min-h-[80vh]">
        <p>
          We understand that ticket cancellation is an important feature that
          will make the customer booking process even smoother.
        </p>
        <p>
          The cancellation feature cannot be made available because all the
          events on our app and website will hosted by businesses and
          organizations who don’t have a cancelation policy that’s why we are
          unable to provide this feature as of now.
        </p>
        <p>
          We are working very hard to get this option across all the businesses
          and organization who are or will host events on our website and app.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default CancellationPolicy;
