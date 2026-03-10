import DepText from "./DepText";
import DepImage from "./DepImg";

const HeroSection = () => {
  return (
    <section className=" py-(--space-xl)">
      <div className="max-w-7xl mx-auto px-(--space-lg) flex flex-col-reverse lg:flex-row items-center gap-(--space-xl)">
        <DepText />
        <DepImage />
      </div>
    </section>
  );
};

export default HeroSection;
