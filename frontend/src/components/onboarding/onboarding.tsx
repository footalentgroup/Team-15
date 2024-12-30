import React from "react";

interface OnboardingCardProps {
    title: string;
    description: string;
    imageSrc: string;
    currentStep: number;
    totalSteps: number;
    buttonText: string;
    onClickNext?: () => void;
    onClickBack?: () => void;
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({
    title,
    description,
    imageSrc,
    currentStep,
    totalSteps,
    buttonText,
    onClickNext,
    onClickBack,
}) => {
    return (
        <div className="flex items-center justify-center min-h-screen text-center w-full">
            <div className="w-[60%]">
                <h2 className="text-xl font-medium my-16">
                    {title}
                </h2>
                <div>
                    <div className="h-72 flex justify-center items-center">
                        <button onClick={onClickBack} type="button" className={`h-12 w-12 mx-16 bg-pink-500 text-white border-2 border-black font-semibold px-4 rounded-full filter drop-shadow-[4px_4px_0px_#000000] ${currentStep === 1 ? "invisible" : ""}`}>
                            {"<"}
                        </button>
                        <img src={imageSrc} alt="Onboarding" className="h-full"/>
                        <button onClick={onClickNext} type="button" className={`h-12 w-12 mx-16 bg-pink-500 text-white border-2 border-black font-semibold px-4 rounded-full filter drop-shadow-[4px_4px_0px_#000000] ${currentStep === totalSteps ? "invisible" : ""}`}>
                            {">"}
                        </button>
                    </div>
                    <p className="text-md font-bold text-gray-800 my-6 px-8 text-center h-16">
                        {description}
                    </p>
                </div>
                <div>
                    <div className="flex space-x-0.5 justify-center items-center my-12">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <div
                                key={index}
                                className={`${index === currentStep - 1
                                        ? "w-4 h-4 bg-cyan-700 rounded-full"
                                        : "w-2 h-4 bg-sky-200 rounded-[50%]"
                                    }`}
                            ></div>
                        ))}
                    </div>
                        <button onClick={onClickNext} type="button" className="my-12 min-w-[136px] min-h-12 bg-pink-500 text-white border-2 border-black font-semibold px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                            {buttonText}
                        </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingCard;
