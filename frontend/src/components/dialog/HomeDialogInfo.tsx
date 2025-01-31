import Image from 'next/image';
import SmileImage from '/public/media/img/smile.svg';
import DialogBigImage from '/public/media/img/dialog-box-big.svg';

interface Props {
  title: string;
  padding?: string;
  handleClose?: () => void;
  rotate?: boolean;
}
/* 
Aquí podrás encontrar dos secciones : 

Tus clases: Aquí verás todas las clases que creaste. Hacé clic en cualquiera para
acceder a las opciones de navegación y empezar a gestionarlas.
Calendario general: Esta es tu herramienta para planificar y organizar tus días.
Para activarlo, primero tenés que ordenar y calendarizar tus unidades y
temas desde la sección Planificación Diaria.

¡Por cierto! En todas las pantallas estaré aquí ? para darte más información y
ayudarte a resolver tus dudas. ¡Contá conmigo!

*/

function HomeDialogInfo({ handleClose, rotate, title }: Props) {
  return (
    <div className={`absolute top-24 left-1/2 -translate-x-1/2 flex ${rotate && "flex-row-reverse"} gap-2 z-20`}>
      <Image src={SmileImage} alt="Smile" className={`absolute top-0 -left-24 ${rotate ? "transform -scale-x-100" : ""} `} />
      <div className="relative content-center top-4 w-[47.25rem] h-80">
        {title && <h2 className="absolute top-10 left-10 text-[1.375rem] text-pink-500 font-bold">{title}</h2>}
        <Image src={DialogBigImage} alt="Dialog" width={756} height={329} className='w-full h-full' />
        <div className='absolute left-10 top-20 w-11/12 grid gap-2'>
          <p>Aquí podrás encontrar dos secciones :</p>
          <ul className='list-disc list-inside gap-1 grid'>
            <li><strong className='underline'>Tus clases:</strong>Aquí verás todas las clases que creaste. Hacé clic en cualquiera para
              acceder a las opciones de navegación y empezar a gestionarlas.</li>
            <li><strong className='underline'>Calendario general:</strong>Esta es tu herramienta para planificar y organizar tus días.
              Para activarlo, primero tenés que ordenar y calendarizar tus unidades y
              temas desde la sección Planificación Diaria.</li>
          </ul>
          <p><strong>
            ¡Por cierto! En todas las pantallas estaré aquí <strong className='text-pink-500'>?</strong> para darte más información y
            ayudarte a resolver tus dudas. ¡Contá conmigo!
          </strong>
          </p>
        </div>
        {handleClose && (
          <button onClick={handleClose} className="absolute top-10 right-6 text-2xl">
            x
          </button>
        )}
      </div>
    </div>
  );
}

export default HomeDialogInfo;