import ScreenShot1 from "../../assets/screen_shots_1.jpeg";
import ScreenShot2 from "../../assets/screen_shots_2.jpeg";
import ScreenShot3 from "../../assets/screen_shots_3.jpeg";

export const Features = () => {
  const imageArray = [ScreenShot1, ScreenShot2, ScreenShot3];
  return (
    <div className="bg-black px-5 py-12">
      <p className="text-white text-5xl font-medium pb-5">
        Features so awesome you'll love it !
      </p>
      <div className="md:flex justify-around space-y-8">
        {imageArray.map((item) => (
          <img src={item} className="mx-auto" alt="w" />
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => {
            window.location.href = "/download";
          }}
          className="bg-white text-xl font-medium px-10 py-4 rounded-lg"
        >
          Download the app now :)
        </button>
      </div>
    </div>
  );
};
