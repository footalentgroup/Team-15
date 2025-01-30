import React from "react";

interface EmptyStateProps {
    singular: string;
    plural: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ singular, plural }) => {
    return (
        <div className="flex gap-6">
            <img src="../../media/img/arrow.png" alt="Arrow" className="h-32 mt-4 ml-20" />
            <div className="self-center">
                <h5 className="text-[20px]">Aún no tenés {plural}.</h5>
                <p className="text-[16px] font-semibold">Creá tu primer {singular} para hacer el seguimiento.</p>
            </div>
            <img src="../../media/img/no-data-s.png" alt="No data" className="h-72 self-end mt-20" />
        </div>
    );
};

export default EmptyState;

