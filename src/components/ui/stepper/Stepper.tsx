import { useStepper } from "./StepperContext"

interface StepperProps {
    children: React.ReactNode
}

export const Stepper = ({ children }: StepperProps) => {
    return <div className="space-y-4">{children}</div>
}
