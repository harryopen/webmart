import hero_image from '../Assets/hero_image.png';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-badge">
            <span>NEW ARRIVALS 2026</span>
          </div>
          
          <h1 className="hero-title">
            <div className="hero-hand-row">
              <span>New</span>
              <img src={hand_icon} alt="Waving Hand" className="hero-hand-img" />
            </div>
            <span>Collections</span>
            <span className="hero-subtitle-highlight">For Everyone</span>
          </h1>
          
          <p className="hero-description">
            Discover the latest trends in high-street fashion, streetwear, and luxury apparel tailored for your everyday style.
          </p>

          <a href="#latest" className="hero-cta-btn group">
            <span>Explore Latest Collection</span>
            <div className="arrow-icon-wrapper">
              <img src={arrow_icon} alt="Arrow Icon" className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <div className="hero-backdrop-glow"></div>
            <img src={hero_image} alt="Featured Fashion Collection" className="hero-main-img animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

