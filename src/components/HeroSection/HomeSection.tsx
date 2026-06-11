import HeroText from "./HomeText";
import HeroImage from "./HeroImage";

interface HomeSectionProps {
  firstName?: string;
}

const HomeSection = ({ firstName }: HomeSectionProps) => {
  return (
    <section className="py-(--space-xl)">
      <div className="max-w-10xl mx-auto px-(--space-lg) flex flex-col-reverse lg:flex-row items-center gap-(--space-xl)">
        <HeroText firstName={firstName} />
        <HeroImage />
      </div>
    </section>
  );
};

export default HomeSection;
