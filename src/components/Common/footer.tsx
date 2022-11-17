import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-black p-8 pb-16 text-white justify-center border-white pt-10">
      <div className="lg:flex lg:justify-between max-w-[1368px] mx-auto space-y-10 lg:space-y-0" >
        <div className="space-y-1">
          <p className="text-2xl">Our Vision</p>
          <p>
            Bringing you the best parties <br /> for you and your freinds .
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl">Contact us @</p>
          <p>
            Email :{" "}
            <a className="font-semibold" href="mailto:thetrendlyapp@gmail.com">
              thetrendlyapp@gmail.com
            </a>
          </p>
          <p>
            Phone :{" "}
            <a className="font-semibold" href="tel:+919872943231">
              +919872943231
            </a>
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl">Company</p>
          <div>
            <Link to="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link to="/terms-and-conditions">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-2xl font-medium pt-20">Made with ❤️ in Chandigarh</div>
    </footer>
  );
};
