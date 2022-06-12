const App = () => {
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
        <div className="absolute xl:top-[35%] md:top-[30%] sm:top-[25%]  w-screen translate-y-[50%] margin-0">
          <h1 className="text-5xl font-bold text-white">
            Trendly - The app for events{" "}
          </h1>
          <p className="text-xl font-regular text-white my-2">
            Bringing you the best events around your city (tricity for now) !
          </p>
          <div className="flex items-center justify-center mt-2 space-x-3">
            <button className="bg-green-500 text-white w-[150px] py-3 rounded-sm">
              Google Play Store
            </button>
            <button className="bg-black text-white w-[150px] py-3 rounded-sm">
              App Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
