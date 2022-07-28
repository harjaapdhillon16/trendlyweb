export const Landing = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="bg-black h-screen w-screen"
    >
      <div className="bg-black h-screen bg-opacity-40 w-screen text-center relative">
        <div className="absolute xl:top-[35%] md:top-[30%] sm:top-[40%]  w-screen md:translate-y-[50%] translate-y-[90%] margin-0">
          <h1 className="text-5xl font-bold text-white">
            Trendly - The app for events
          </h1>
          <p className="text-xl font-regular text-white py-4 px-2">
            Bringing you the best events around your city (tricity for now) !
          </p>
          <div className="md:flex items-center justify-center md:space-x-3 mt-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.app.kindly"
              target="_blank"
              rel="noreferrer"
              className="bg-white flex items-center text-black w-[200px] justify-center h-[49px] py-2 rounded-lg space-x-1 mb-2 md:mb-0 mx-auto md:mx-0"
            >
              <img
                alt="google"
                className="h-8 w-8"
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              />
              <span>Google Play Store</span>
            </a>
            <a
              href="https://apps.apple.com/in/app/trendly-events-near-you/id1607744954"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black flex items-center justify-center w-[200px] h-[49px] py-2 rounded-lg space-x-1 mx-auto md:mx-0"
            >
              <img
                alt="apple"
                className="h-7 w-7 object-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png"
              />
              <span>App Store</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
