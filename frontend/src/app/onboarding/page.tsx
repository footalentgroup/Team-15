"use client";
import React, { useState } from "react";
import Onboarding from "../../components/onboarding/onboarding";

const onboardingSteps = [
    {
        title: "¡Bienvenido [Nombre de usuario]!",
        description:
            "PalProfe te ayudara a organizar tu trabajo docente de manera sencilla y eficiente. Una plataforma donde todo está conectado: planificación, seguimiento de alumnos, notas rápidas y recursos, todo en un solo lugar.",
        imageSrc: "../media/img/ob-1.png",
        buttonText: "Comenzar",
    },
    {
        title: "Planifica y crea tu contenido",
        description:
            "Planifica tus clases de forma sencilla. Organiza el contenido por meses y crea los temas y actividades organizandolas dia  a dia. Todo pensado para que ahorres tiempo.",
        imageSrc: "../media/img/ob-2.png",
        buttonText: "Comenzar",
    },
    {
        title: "Haz un seguimiento del alumnado",
        description:
            "Lleva el control de tus clases y alumnos en un solo lugar. Registra asistencia, evalúa su desempeño y añade notas personalizadas para no olvidar ningún detalle.",
        imageSrc: "../media/img/ob-3.png",
        buttonText: "Comenzar",
    },
    {
        title: "Tus recursos y notas ¡siempre a mano!",
        description:
            "Guarda y organiza tus materiales: enlaces, documentos, presentaciones y más. Además, anota ideas importantes al instante con texto o grabaciones de audio. Todo estará siempre a mano.",
        imageSrc: "../media/img/ob-4.png",
        buttonText: "Comenzar",
    },
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < onboardingSteps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            setCurrentStep(1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            setCurrentStep(onboardingSteps.length);
        }
    };

    const stepData = onboardingSteps[currentStep - 1];

    return (
        <Onboarding
            title={stepData.title}
            description={stepData.description}
            imageSrc={stepData.imageSrc}
            currentStep={currentStep}
            totalSteps={onboardingSteps.length}
            buttonText={stepData.buttonText}
            onClickNext={handleNext}
            onClickBack={handleBack}
        />
    );
}
