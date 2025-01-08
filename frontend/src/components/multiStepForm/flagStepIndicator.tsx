import { IconBookmark } from "@/icons";

interface Props {
  step: number;
  title: string;
}

const FlagStepIndicator = ({ step, title }: Props) => {
  return (
    <div className='absolute -top-2 right-16 text-pink-500'>
      <IconBookmark />
      <div className="absolute top-[40%] -translate-y-1/2 left-1/2 -translate-x-1/2">
        <p className='text-sm text-center'>{step}/3</p>
        <p className='text-center font-semibold'>{title}</p>
      </div>
    </div>
  );
}

export default FlagStepIndicator;