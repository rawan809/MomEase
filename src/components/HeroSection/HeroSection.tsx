import HeroText from "./HeroText";
import HeroImage from "./HeroImage";

const HeroSection = () => {
  return (
    <section className=" py-(--space-xl)">
      <div className="max-w-7xl mx-auto px-(--space-lg) flex flex-col-reverse lg:flex-row items-center gap-(--space-xl)">
        <HeroText />
        <HeroImage />
      </div>
    </section>
  );
};

export default HeroSection;
