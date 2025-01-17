import { IconArrow } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OnboardingCardProps {
    title: string;
    username: string | null;
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
    username,
    description,
    imageSrc,
    currentStep,
    totalSteps,
    buttonText,
    onClickNext,
    onClickBack,
}) => {
    return (
        <div className="w-full bg-[#FFFAEB] relative">
            <Image src="/PalProfeLogo.svg" alt="User photo" className="absolute top-14 left-14" width={150} height={96} />
            <div className="flex items-center justify-center min-h-screen text-center">
                <div className="w-[60%]">
                    <h2 className="text-[22px] font-semibold mb-16">
                        {currentStep === 1 && username ? title + " " + username + "!" : title}
                    </h2>
                    <div>
                        <div className="h-[300px] flex justify-center items-center ">
                            <button onClick={onClickBack} type="button" className={`h-12 w-12 mx-16 bg-yellow-light hover:bg-pink-500 hover:text-white border-2 border-black font-semibold rounded-full filter drop-shadow-[4px_4px_0px_#000000] justify-items-center ${currentStep === 1 ? "invisible" : ""}`}>
                                <IconArrow color="black" hoverColor="white" classNames="rotate-180 text-white h-full w-full" />
                            </button>
                            <img src={imageSrc} alt="Onboarding" className="h-full" />
                            <button onClick={onClickNext} type="button" className={`h-12 w-12 mx-16 bg-yellow-light hover:bg-pink-500 hover:text-white border-2 border-black font-semibold rounded-full filter drop-shadow-[4px_4px_0px_#000000] justify-items-center ${currentStep === totalSteps ? "invisible" : ""}`}>
                                <IconArrow color="black" hoverColor="white" classNames="h-full w-full" />
                            </button>
                        </div>
                        <p className="text-[16px] font-bold text-gray-800 mb-2 mt-6 px-8 text-center h-16">
                            {description}
                        </p>
                    </div>
                    <div>
                        <div className="flex space-x-0.5 justify-center items-center my-2">
                            {Array.from({ length: totalSteps }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`${index === currentStep - 1
                                        ? "w-4 h-4 bg-[#0287A6] rounded-full"
                                        : "w-2 h-4 bg-[#55DBFA] rounded-[50%]"
                                        }`}
                                ></div>
                            ))}
                        </div>
                        <div>
                            {currentStep === totalSteps ? (
                                <Link href="/add-course">
                                    <button
                                        type="button"
                                        className="my-6 min-w-[136px] min-h-12 bg-pink-500 text-white border-2 border-black font-semibold px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                                    >
                                        {buttonText}
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={onClickNext}
                                    type="button"
                                    className="my-6 min-w-[136px] min-h-12 bg-pink-500 text-white border-2 border-black font-semibold px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                                >
                                    {buttonText}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingCard;
