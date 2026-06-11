import DepText from "./DepText";
import DepImage from "./DepImg";

const HeroSection = () => {
  return (
    <section className=" py-20">
      <div className="max-w-10xl mx-auto px-(--space-lg) flex flex-col-reverse lg:flex-row items-center gap-(--space-xl)">
        <DepText />
        <DepImage />
      </div>
    </section>
  );
};

export default HeroSection;
