import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import LandingPage from "../pages/LandingPage";

function App() {
  return (
    <>
      
      <div className="p-10">
        <p className="text-primary">primary</p>
        <p className="text-muted bg-background">muted</p>
        <button className="shadow-md bg-accent text-primary px-5 radius-lg rounded-lg">
          btn
        </button>
        <p className="text-primary font-brand text-2xl">MomEase</p>
      </div>
      <LandingPage />
    </>
  );
}

export default App;
