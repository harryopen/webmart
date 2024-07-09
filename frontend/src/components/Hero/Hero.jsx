
import hero_image from "../Assets/hero_image.png";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";

const Hero = () => {
  return (
    <div className="hero flex h-[100vh] bg-gradient-to-b from-cyan-100 to-blue-50">
      <div className="hero-left  flex-1 flex flex-col justify-center gap-5 pl-[180px]">
        <h2 className="text-2xl font-bold">NEW ARRIVALS ONLY</h2>
        <div>
          <div className=" hero-hand-icon flex item-center gap-10">
            <p  className="text-3xl font-extrabold">new</p>
            <img className="w-32 " src={hand_icon} alt="" />
          </div>
          <p className="text-3xl font-extrabold">collections</p>
          <p className="text-3xl font-extrabold">for everyone</p>
        </div>
        <div className="hero-latest-btn flex justify-center items-center gap-5 w-40 h-10 rounded-sm text-2xl">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right flex flex-1 item-center justify-center">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
