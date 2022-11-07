import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black p-8 pb-16 text-white">
      <div className="space-y-1">
        <p className="text-4xl">Contact us @</p>
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
      <div className="text-center text-2xl font-medium pt-8">Made with ❤️ in Chandigarh</div>
    </footer>
  );
};
