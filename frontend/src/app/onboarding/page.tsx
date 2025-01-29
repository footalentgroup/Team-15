"use client";
import React, { useEffect, useState } from "react";
import Onboarding from "../../components/onboarding/onboarding";
import { useRouter } from "next/navigation";
import withAuth from "@/actions/withAuth";

const onboardingSteps = [
    {
        title: "¡Bienvenido",
        description:
            "PalProfe te ayudará a organizar tu trabajo docente de manera sencilla y eficiente. Una plataforma donde todo está conectado: planificación, seguimiento de alumnos, notas rápidas y recursos, todo en un único lugar.",
        imageSrc: "../media/img/ob-1.png",
        buttonText: "Comenzar",
    },
    {
        title: "Planificá y creá tu contenido",
        description:
            "Planificá tus clases de forma sencilla. Organizá el contenido por meses y creá los temas y actividades, distribuyéndolos día a día. Todo está pensado para que ahorres tiempo.",
        imageSrc: "../media/img/ob-2.png",
        buttonText: "Comenzar",
    },
    {
        title: "Llevá un seguimiento del alumnado",
        description:
            "Mantené el control de tus clases y alumnos en un solo lugar. Registrá asistencia, evaluá su desempeño y añadí notas personalizadas para no olvidar ningún detalle.",
        imageSrc: "../media/img/ob-3.png",
        buttonText: "Comenzar",
    },
    {
        title: "¡Tené tus recursos y notas siempre a mano!",
        description:
            "Guardá y organizá tus materiales: enlaces, documentos, presentaciones y más. Además, anotá ideas importantes al instante, ya sea con texto o grabaciones de audio. Todo estará siempre a mano.",
        imageSrc: "../media/img/ob-4.png",
        buttonText: "Comenzar",
    },
];

const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    const handleNext = () => {
        if (currentStep < onboardingSteps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            router.push("/add-course");
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

    useEffect(() => {
        const user = localStorage.getItem("username");
        setUsername(user ?? "Profe");
    }, []);

    return (
        <Onboarding
            title={stepData.title}
            username={username}
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

export default withAuth(OnboardingPage);
