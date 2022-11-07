import ScreenShot1 from "../../assets/screen_shots_1.png";
import ScreenShot2 from "../../assets/screen_shots_2.png";
import ScreenShot3 from "../../assets/screen_shots_3.png";

export const Features = () => {
  const imageArray = [ScreenShot1, ScreenShot2, ScreenShot3];
  return (
    <div className="bg-black px-5 py-12">
      <p className="text-white text-5xl font-medium pb-8">
        Events at you're finger tips !
      </p>
      <div className="md:flex justify-around space-y-8 md:space-y-0">
        {imageArray.map((item) => (
          <img
            src={item}
            className="mx-auto h-[600px] border-white border-2 object-contain rounded-lg w-[280px]"
            alt="w"
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => {
            window.location.href = "/download";
          }}
          className="bg-white text-xl  font-medium px-10 py-4 rounded-lg"
        >
          Download the app now :)
        </button>
      </div>
    </div>
  );
};
