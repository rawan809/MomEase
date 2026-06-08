import DepSection from "@/components/Depression/DepSection";
import DepCards from "@/components/Depression/DepCards";
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
