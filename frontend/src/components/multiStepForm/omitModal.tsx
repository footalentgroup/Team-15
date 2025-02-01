import ButtonContinue from '@/ui/buttons/buttonContinue';
import React from 'react';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleCancel: () => void;
  handleConfirm: () => void;
}

function OmitModal({ isModalOpen, setIsModalOpen, handleCancel, handleConfirm }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-modal">
      <div className="flex flex-col gap-4 bg-yellow-100 p-4 rounded-lg w-[448px] h-[243px] px-6 filter drop-shadow-modal">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">¿Querés omitir este paso?</h3>
          <button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>✖</button>
        </div>
        <p>Abandonarás el proceso de carga de contenidos. No te preocupes, podrás volver a empezar en cualquier momento desde planificación.</p>
        <div className="flex justify-end space-x-4 mt-auto">
          <ButtonContinue type='button' text="Aceptar" onClick={handleConfirm} />
          <ButtonContinue type="button" text="Cancelar" color="bg-white" onClick={handleCancel} />
        </div>
      </div>
    </div>
  );
}

export default OmitModal;