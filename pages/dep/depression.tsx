import DepSection from "../../src/components/Depression/DepSection";
import DepCards from "../../src/components/Depression/DepCards";
export default function Depression() {
  return (
    <>
      <div className="flex flex-col">
        <DepSection />
        <DepCards />
      </div>
    </>
  );
}
