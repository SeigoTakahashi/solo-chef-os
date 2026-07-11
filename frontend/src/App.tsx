import { useState } from "react";
import "./App.css";
import Step_0 from "./pages/Step_0";
import Step_1 from "./pages/Step_1";
import Step_2 from "./pages/Step_2";
import GeneratingLoading from "./pages/GeneratingLoading";

function App() {
  const [currentStep, setCurrentStep] = useState(3);
  return (
    <div className="App">
      {currentStep === 0 && <Step_0 />}
      {currentStep === 1 && <Step_1 />}
      {currentStep === 2 && <Step_2 />}
      {currentStep === 3 && <GeneratingLoading />}
    </div>
  );
}

export default App;
