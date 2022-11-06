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
          <a className="font-semibold" href="tel:+9198729432321">
            +91-98729432321
          </a>
        </p>
      </div>
      <div className="text-center text-2xl font-medium pt-8">Made with ❤️ in Chandigarh</div>
    </footer>
  );
};
