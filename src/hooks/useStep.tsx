import { createContext, useContext } from "react";

import { Step } from "@types";

export type StepContextType = {
  step: Step;
  setStep: (step: Step) => void;
};

export const StepContext = createContext<StepContextType>({
  step: Step.INIT,
  setStep: () => console.warn("no provider"),
});

export const useStep = () => useContext(StepContext);
