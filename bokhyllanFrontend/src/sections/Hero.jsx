// HERO COMPONENT
// IMPORT DEPENDENCIES
import "./hero.css";
// IMPORT FROM PUBLIC FOLDER
const heroImage = "/images/reader-on-train.png";
// FUNCTION
function Hero() {
  const slogan = "Att läsa är att resa";
  return (
    <section className="hero-container">
      <img
        src={heroImage}
        alt="Person som läser på ett tåg"
        className="hero-image"
      />
      <p className="hero-slogan">{slogan}</p>
    </section>
  );
}
// EXPORT
export default Hero;
