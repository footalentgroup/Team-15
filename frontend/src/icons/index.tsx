interface IconProps {
  classNames?: string;
  rotate?: boolean;
}

export const IconArrow = ({ rotate }: IconProps) => {
  return (
    <svg
      width='32px'
      height='32px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      rotate={rotate ? '180deg' : ''}
    >
      <path
        d='M10.0001 6L8.59009 7.41L13.1701 12L8.59009 16.59L10.0001 18L16.0001 12L10.0001 6Z'
        fill='#F2F2F2'
      />
    </svg>
  );
};