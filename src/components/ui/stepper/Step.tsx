import { useStepper } from "./StepperContext"

interface StepProps {
    index: number
    title: string
    children: React.ReactNode
}

export const Step = ({ index, title, children }: StepProps) => {
    const { activeStep } = useStepper()

    return (
        <div
            className={`p-4 border rounded-md ${
                activeStep === index ? "border-blue-500" : "border-gray-300"
            }`}
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            {activeStep === index && <div className="mt-2">{children}</div>}
        </div>
    )
}
