import { useState } from "react";
import "./App.css";
import Step_0_Start from "./pages/Step_0_Start";
import Step_1_ModeSelection from "./pages/Step_1_ModeSelection";
import Step_2_ConditionSelection from "./pages/Step_2_ConditionSelection";
import Step_3_GeneratingLoading from "./pages/Step_3_GeneratingLoading";
import Step_4_RecipeResult from "./pages/Step_4_RecipeResult";
import Header from "./components/Header";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex items-center justify-center bg-white px-6">
        {currentStep === 0 && <Step_0_Start />}
        {currentStep === 1 && <Step_1_ModeSelection />}
        {currentStep === 2 && <Step_2_ConditionSelection />}
        {currentStep === 3 && <Step_3_GeneratingLoading />}
        {currentStep === 4 && <Step_4_RecipeResult />}
      </div>
    </div>
  );
}

export default App;
