"use client"

import React, { createContext, useContext, useState } from "react"

interface StepperContextProps {
    activeStep: number
    goToNextStep: () => void
    goToPreviousStep: () => void
    setStep: (step: number) => void
}

const StepperContext = createContext<StepperContextProps | undefined>(undefined)

export const StepperProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [activeStep, setActiveStep] = useState(0)

    const goToNextStep = () => setActiveStep((prev) => prev + 1)
    const goToPreviousStep = () =>
        setActiveStep((prev) => (prev > 0 ? prev - 1 : prev))
    const setStep = (step: number) => setActiveStep(step)

    return (
        <StepperContext.Provider
            value={{ activeStep, goToNextStep, goToPreviousStep, setStep }}
        >
            {children}
        </StepperContext.Provider>
    )
}

export const useStepper = () => {
    const context = useContext(StepperContext)
    if (!context) {
        throw new Error("useStepper must be used within a StepperProvider")
    }
    return context
}
