import React from "react";

interface OnboardingCardProps {
    title: string;
    description: string;
    imageSrc: string;
    currentStep: number;
    totalSteps: number;
    buttonText: string;
    onClick?: () => void;
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({
    title,
    description,
    imageSrc,
    currentStep,
    totalSteps,
    buttonText,
    onClick,
}) => {
    return (
        <div className="flex items-center justify-center min-h-screen text-center w-full">
            <div className="w-[60%]">
                <h2 className="text-xl font-bold mb-16">{title}</h2>
                <div>
                    <div className="h-52 flex justify-center">
                        <img src={imageSrc} alt="Onboarding" />
                    </div>
                    <p className="text-md font-medium text-gray-800 my-6 px-16 text-justify h-16">
                        {description}
                    </p>
                </div>
                <div>
                    <div className="flex space-x-1 justify-center items-center mt-12 mb-20">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <div
                                key={index}
                                className={`${index === currentStep - 1
                                        ? "w-3 h-3 bg-gray-800"
                                        : "w-3 h-3 bg-gray-400"
                                    } rounded-full`}
                            ></div>
                        ))}
                    </div>
                        <button onClick={onClick} type="button" className="h-9 text-black bg-white border-2 border-black shadow-[3px_3px_0px_black] focus:outline-none hover:bg-pink-600 hover:text-white font-semibold rounded-md text-sm px-4 py-2">
                            {buttonText}
                        </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingCard;
