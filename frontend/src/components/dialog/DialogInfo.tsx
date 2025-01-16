import Image from 'next/image';
import SmileImage from '/public/media/img/smile.svg';
import DialogImage from '/public/media/img/dialog-box.svg';
import DialogSmallImage from '/public/media/img/globo_texto.svg';

interface Props {
  text: string;
  bottom?: string;
  left?: string;
  padding?: string;
  handleClose?: () => void;
  rotate?: boolean;
  small?: boolean;
}

function DialogInfo({ text, bottom, left, padding, handleClose, rotate, small }: Props) {
  return (
    <div className={`absolute ${bottom ? bottom : "bottom-16"} ${left ? left : "left-9"} flex ${rotate && "flex-row-reverse"} gap-2 z-20`}>
      <Image src={SmileImage} alt="Smile" className={`mb-16 ${rotate ? "transform -scale-x-100" : ""} `} />
      <div className="relative content-center">
        {small ?
          (<Image src={DialogSmallImage} alt="Dialog" width={356} height={65} />)
          :
          (<Image src={DialogImage} alt="Dialog" width={464} height={91} className={`${rotate ? "transform -scale-x-100" : ""}`} />)
        }
        <p className={`${small ? "w-[300px] h-[16px]" : "w-[430px] h-[75px]"} ${padding && padding} absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 leading-tight`}>{text}</p>
        {handleClose && (
          <button onClick={handleClose} className="absolute top-1/2 -translate-y-1/2 right-6 text-2xl text-red-600">
            x
          </button>
        )}
      </div>
    </div>
  );
}

export default DialogInfo;