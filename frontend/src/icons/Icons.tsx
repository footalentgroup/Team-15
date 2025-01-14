import { useState } from "react";

export interface IconProps {
  classNames?: string;
  rotate?: boolean;
  color?: string;
  hoverColor?: string;
}

export const IconArrow: React.FC<IconProps> = ({ rotate, classNames, color, hoverColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width='32px' height='32px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'
      rotate={rotate ? '180deg' : ''} className={classNames}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <path
        d='M10.0001 6L8.59009 7.41L13.1701 12L8.59009 16.59L10.0001 18L16.0001 12L10.0001 6Z'
        fill={hoverColor && isHovered ? hoverColor ?? color : color ?? '#F2F2F2'}
      />
    </svg>
  );
};

export const IconInfo = ({ classNames }: IconProps) => {
  return (
    <svg width="21" height="21" className={classNames} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.5 10.5C20.5 16.0228 16.0228 20.5 10.5 20.5C4.97715 20.5 0.5 16.0228 0.5 10.5C0.5 4.97715 4.97715 0.5 10.5 0.5C16.0228 0.5 20.5 4.97715 20.5 10.5ZM11.75 5.5C11.75 6.19036 11.1904 6.75 10.5 6.75C9.80964 6.75 9.25 6.19036 9.25 5.5C9.25 4.80964 9.80964 4.25 10.5 4.25C11.1904 4.25 11.75 4.80964 11.75 5.5ZM9.25 9.25C8.55964 9.25 8 9.80964 8 10.5C8 11.1904 8.55964 11.75 9.25 11.75V15.5C9.25 16.1904 9.80964 16.75 10.5 16.75H11.75C12.4404 16.75 13 16.1904 13 15.5C13 14.8096 12.4404 14.25 11.75 14.25V10.5C11.75 9.80964 11.1904 9.25 10.5 9.25H9.25Z" fill="#01CAF8" />
    </svg>

  )
}

export const IconTrash = ({ classNames, color }: IconProps) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={classNames}
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_748_3158)">
        <path d="M14.589 5.625H3.41025C3.35803 5.62479 3.30634 5.63548 3.2585 5.6564C3.21065 5.67732 3.1677 5.70801 3.1324 5.74649C3.0971 5.78496 3.07022 5.83039 3.05349 5.87986C3.03676 5.92933 3.03055 5.98174 3.03525 6.03375L4.0005 16.6357C4.03438 17.0086 4.20644 17.3552 4.48287 17.6077C4.75931 17.8601 5.12015 18 5.4945 18H12.5048C12.8791 18 13.2399 17.8601 13.5164 17.6077C13.7928 17.3552 13.9649 17.0086 13.9988 16.6357L14.9625 6.03375C14.9671 5.98189 14.9609 5.92964 14.9443 5.88032C14.9276 5.83099 14.9009 5.78567 14.8657 5.74725C14.8306 5.70877 14.7879 5.67802 14.7403 5.65698C14.6926 5.63593 14.6411 5.62504 14.589 5.625ZM7.689 15.375C7.689 15.5242 7.62974 15.6673 7.52425 15.7727C7.41876 15.8782 7.27568 15.9375 7.1265 15.9375C6.97732 15.9375 6.83424 15.8782 6.72875 15.7727C6.62326 15.6673 6.564 15.5242 6.564 15.375V8.625C6.564 8.47582 6.62326 8.33274 6.72875 8.22725C6.83424 8.12176 6.97732 8.0625 7.1265 8.0625C7.27568 8.0625 7.41876 8.12176 7.52425 8.22725C7.62974 8.33274 7.689 8.47582 7.689 8.625V15.375ZM11.439 15.375C11.439 15.5242 11.3797 15.6673 11.2742 15.7727C11.1688 15.8782 11.0257 15.9375 10.8765 15.9375C10.7273 15.9375 10.5842 15.8782 10.4788 15.7727C10.3733 15.6673 10.314 15.5242 10.314 15.375V8.625C10.314 8.47582 10.3733 8.33274 10.4788 8.22725C10.5842 8.12176 10.7273 8.0625 10.8765 8.0625C11.0257 8.0625 11.1688 8.12176 11.2742 8.22725C11.3797 8.33274 11.439 8.47582 11.439 8.625V15.375ZM16.5 3H12.9375C12.8878 3 12.8401 2.98025 12.8049 2.94508C12.7698 2.90992 12.75 2.86223 12.75 2.8125V1.875C12.75 1.37772 12.5525 0.900805 12.2008 0.549175C11.8492 0.197544 11.3723 0 10.875 0H7.125C6.62772 0 6.15081 0.197544 5.79917 0.549175C5.44754 0.900805 5.25 1.37772 5.25 1.875V2.8125C5.25 2.86223 5.23025 2.90992 5.19508 2.94508C5.15992 2.98025 5.11223 3 5.0625 3H1.5C1.30109 3 1.11032 3.07902 0.96967 3.21967C0.829018 3.36032 0.75 3.55109 0.75 3.75C0.75 3.94891 0.829018 4.13968 0.96967 4.28033C1.11032 4.42098 1.30109 4.5 1.5 4.5H16.5C16.6989 4.5 16.8897 4.42098 17.0303 4.28033C17.171 4.13968 17.25 3.94891 17.25 3.75C17.25 3.55109 17.171 3.36032 17.0303 3.21967C16.8897 3.07902 16.6989 3 16.5 3ZM6.75 2.8125V1.875C6.75 1.77554 6.78951 1.68016 6.85983 1.60984C6.93016 1.53951 7.02554 1.5 7.125 1.5H10.875C10.9745 1.5 11.0698 1.53951 11.1402 1.60984C11.2105 1.68016 11.25 1.77554 11.25 1.875V2.8125C11.25 2.86223 11.2302 2.90992 11.1951 2.94508C11.1599 2.98025 11.1122 3 11.0625 3H6.9375C6.88777 3 6.84008 2.98025 6.80492 2.94508C6.76975 2.90992 6.75 2.86223 6.75 2.8125Z" fill={color ?? "black"} />
      </g>
      <defs>
        <clipPath id="clip0_748_3158">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
}

export const IconEdit = ({ classNames }: IconProps) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={classNames}
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_748_3160)">
        <path d="M8.25 2.99919H3C2.60218 2.99919 2.22064 3.15723 1.93934 3.43853C1.65804 3.71984 1.5 4.10137 1.5 4.49919V14.9992C1.5 15.397 1.65804 15.7785 1.93934 16.0599C2.22064 16.3412 2.60218 16.4992 3 16.4992H13.5C13.8978 16.4992 14.2794 16.3412 14.5607 16.0599C14.842 15.7785 15 15.397 15 14.9992V9.74919M13.875 1.87419C14.1734 1.57582 14.578 1.4082 15 1.4082C15.422 1.4082 15.8266 1.57582 16.125 1.87419C16.4234 2.17256 16.591 2.57724 16.591 2.99919C16.591 3.42115 16.4234 3.82582 16.125 4.12419L9 11.2492L6 11.9992L6.75 8.99919L13.875 1.87419Z" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_748_3160">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
}

export const IconHome = ({ classNames, color }: IconProps) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" className={classNames} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 6.125C3.27614 6.125 3.5 6.34886 3.5 6.625V14H6V10.25C6 9.91848 6.1317 9.60054 6.36612 9.36612C6.60054 9.1317 6.91848 9 7.25 9H9.75C10.0815 9 10.3995 9.1317 10.6339 9.36612C10.8683 9.60054 11 9.91848 11 10.25V14H13.5V6.625C13.5 6.34886 13.7239 6.125 14 6.125C14.2761 6.125 14.5 6.34886 14.5 6.625V14C14.5 14.2652 14.3946 14.5196 14.2071 14.7071C14.0196 14.8946 13.7652 15 13.5 15H10.5C10.2239 15 10 14.7761 10 14.5V10.25C10 10.1837 9.97366 10.1201 9.92678 10.0732C9.87989 10.0263 9.8163 10 9.75 10H7.25C7.1837 10 7.12011 10.0263 7.07322 10.0732C7.02634 10.1201 7 10.1837 7 10.25V14.5C7 14.7761 6.77614 15 6.5 15H3.5C3.23478 15 2.98043 14.8946 2.79289 14.7071C2.60536 14.5196 2.5 14.2652 2.5 14V6.625C2.5 6.34886 2.72386 6.125 3 6.125Z" fill={color ? color : "#191F2B"} />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.19287 1.26978L11 2.99966V1.99945C11 1.72331 11.2239 1.49945 11.5 1.49945H13C13.2761 1.49945 13.5 1.72331 13.5 1.99945V5.39279L15.8458 7.63826C16.0452 7.82922 16.0521 8.14572 15.8612 8.3452C15.6702 8.54468 15.3537 8.55159 15.1543 8.36064L8.51002 2.00044C8.50697 2.00017 8.50366 2.00001 8.50016 2C8.49654 1.99999 8.49312 2.00015 8.48999 2.00043L1.84575 8.36064C1.64627 8.55159 1.32976 8.54468 1.13881 8.3452C0.94786 8.14572 0.954772 7.82922 1.15425 7.63826L7.80756 1.26937C8.01152 1.06259 8.28947 0.999621 8.50195 1C8.71356 1.00038 8.99052 1.06387 9.19287 1.26978ZM12.5 4.43554V2.49945H12V3.95691L12.5 4.43554Z" fill={color ? color : "#191F2B"} />
    </svg>

  )
}

export const IconFollowUp = ({ classNames, color }: IconProps) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" className={classNames} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.1667 1.99935H10.38C10.1 1.22602 9.36667 0.666016 8.5 0.666016C7.63333 0.666016 6.9 1.22602 6.62 1.99935H3.83333C3.1 1.99935 2.5 2.59935 2.5 3.33268V12.666C2.5 13.3993 3.1 13.9993 3.83333 13.9993H13.1667C13.9 13.9993 14.5 13.3993 14.5 12.666V3.33268C14.5 2.59935 13.9 1.99935 13.1667 1.99935ZM8.5 1.83268C8.77333 1.83268 9 2.05935 9 2.33268C9 2.60602 8.77333 2.83268 8.5 2.83268C8.22667 2.83268 8 2.60602 8 2.33268C8 2.05935 8.22667 1.83268 8.5 1.83268ZM13.1667 12.666H3.83333V3.33268H13.1667V12.666Z" fill={color ? color : "#191F2B"} />
      <path d="M10.5537 7.35268L9.14033 5.93935L5.16699 9.90601V11.3327H6.56699L10.5537 7.35268ZM11.7337 6.17935C11.867 6.04602 11.867 5.83935 11.7337 5.70602L10.7937 4.76602C10.6603 4.63268 10.4537 4.63268 10.3203 4.76602L9.61366 5.47268L11.027 6.88602L11.7337 6.17935Z" fill={color ? color : "#191F2B"} />
    </svg>
  )
}

export const IconCalendar = ({ classNames, color }: IconProps) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" className={classNames} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.945 11.688V6.354H6.312C5.85864 6.59567 5.42049 6.86484 5 7.16V7.855C5.375 7.598 5.969 7.235 6.258 7.078H6.27V11.688H6.945ZM8.133 10.383C8.18 11.023 8.727 11.789 9.836 11.789C11.094 11.789 11.836 10.723 11.836 8.918C11.836 6.984 11.055 6.25 9.883 6.25C8.957 6.25 8.086 6.922 8.086 8.059C8.086 9.219 8.91 9.829 9.762 9.829C10.508 9.829 10.992 9.453 11.145 9.039H11.172C11.168 10.355 10.711 11.203 9.867 11.203C9.203 11.203 8.859 10.753 8.817 10.383H8.133ZM11.086 8.066C11.086 8.762 10.527 9.246 9.902 9.246C9.301 9.246 8.758 8.863 8.758 8.046C8.758 7.223 9.34 6.836 9.926 6.836C10.559 6.836 11.086 7.234 11.086 8.066Z" fill={color ? color : "#191F2B"} />
      <path d="M4 0C4.13261 0 4.25979 0.0526784 4.35355 0.146447C4.44732 0.240215 4.5 0.367392 4.5 0.5V1H12.5V0.5C12.5 0.367392 12.5527 0.240215 12.6464 0.146447C12.7402 0.0526784 12.8674 0 13 0C13.1326 0 13.2598 0.0526784 13.3536 0.146447C13.4473 0.240215 13.5 0.367392 13.5 0.5V1H14.5C15.0304 1 15.5391 1.21071 15.9142 1.58579C16.2893 1.96086 16.5 2.46957 16.5 3V14C16.5 14.5304 16.2893 15.0391 15.9142 15.4142C15.5391 15.7893 15.0304 16 14.5 16H2.5C1.96957 16 1.46086 15.7893 1.08579 15.4142C0.710714 15.0391 0.5 14.5304 0.5 14V3C0.5 2.46957 0.710714 1.96086 1.08579 1.58579C1.46086 1.21071 1.96957 1 2.5 1H3.5V0.5C3.5 0.367392 3.55268 0.240215 3.64645 0.146447C3.74021 0.0526784 3.86739 0 4 0V0ZM1.5 4V14C1.5 14.2652 1.60536 14.5196 1.79289 14.7071C1.98043 14.8946 2.23478 15 2.5 15H14.5C14.7652 15 15.0196 14.8946 15.2071 14.7071C15.3946 14.5196 15.5 14.2652 15.5 14V4H1.5Z" fill={color ? color : "#191F2B"} />
    </svg>
  )
}

export const IconResources = ({ classNames, color }: IconProps) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" className={classNames} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.6766 3.07266C11.2047 1.60078 8.80783 1.60078 7.33751 3.07266L3.25939 7.14766C3.23283 7.17422 3.21876 7.21016 3.21876 7.24766C3.21876 7.28516 3.23283 7.32109 3.25939 7.34766L3.83595 7.92422C3.86231 7.95046 3.89798 7.96519 3.93517 7.96519C3.97236 7.96519 4.00804 7.95046 4.03439 7.92422L8.11251 3.84922C8.61876 3.34297 9.2922 3.06484 10.0078 3.06484C10.7235 3.06484 11.3969 3.34297 11.9016 3.84922C12.4078 4.35547 12.686 5.02891 12.686 5.74297C12.686 6.45859 12.4078 7.13047 11.9016 7.63672L7.74533 11.7914L7.07189 12.4648C6.4422 13.0945 5.41876 13.0945 4.78908 12.4648C4.48439 12.1602 4.3172 11.7555 4.3172 11.3242C4.3172 10.893 4.48439 10.4883 4.78908 10.1836L8.91251 6.06172C9.0172 5.95859 9.1547 5.90078 9.30158 5.90078H9.30314C9.45001 5.90078 9.58595 5.95859 9.68908 6.06172C9.79376 6.16641 9.85001 6.30391 9.85001 6.45078C9.85001 6.59609 9.7922 6.73359 9.68908 6.83672L6.31876 10.2039C6.2922 10.2305 6.27814 10.2664 6.27814 10.3039C6.27814 10.3414 6.2922 10.3773 6.31876 10.4039L6.89533 10.9805C6.92168 11.0067 6.95736 11.0214 6.99455 11.0214C7.03173 11.0214 7.06741 11.0067 7.09376 10.9805L10.4625 7.61172C10.7735 7.30078 10.9438 6.88828 10.9438 6.44922C10.9438 6.01016 10.7719 5.59609 10.4625 5.28672C9.82033 4.64453 8.77658 4.64609 8.13439 5.28672L7.73439 5.68828L4.01251 9.40859C3.75991 9.65972 3.55967 9.9585 3.42341 10.2876C3.28716 10.6167 3.2176 10.9696 3.21876 11.3258C3.21876 12.0492 3.50158 12.7289 4.01251 13.2398C4.5422 13.768 5.23595 14.032 5.9297 14.032C6.62345 14.032 7.3172 13.768 7.84533 13.2398L12.6766 8.41172C13.3875 7.69922 13.7813 6.75078 13.7813 5.74297C13.7828 4.73359 13.3891 3.78516 12.6766 3.07266Z" fill={color ? color : "#191F2B"} />
    </svg>
  )
}

export const IconNotes = ({ classNames, color }: IconProps) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" className={classNames} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.1667 2H3.83333C3.098 2 2.5 2.598 2.5 3.33333V12.6667C2.5 13.402 3.098 14 3.83333 14H9.16667C9.25423 14.0001 9.34095 13.9829 9.42184 13.9494C9.50273 13.9159 9.5762 13.8667 9.638 13.8047L14.3047 9.138C14.3595 9.08117 14.4037 9.01502 14.4353 8.94267C14.4447 8.92267 14.45 8.902 14.4573 8.88067C14.4763 8.82488 14.4878 8.76681 14.4913 8.708C14.4927 8.694 14.5 8.68067 14.5 8.66667V3.33333C14.5 2.598 13.902 2 13.1667 2ZM3.83333 3.33333H13.1667V8H9.16667C8.98986 8 8.82029 8.07024 8.69526 8.19526C8.57024 8.32029 8.5 8.48986 8.5 8.66667V12.6667H3.83333V3.33333ZM9.83333 11.724V9.33333H12.224L9.83333 11.724Z" fill={color ? color : "#191F2B"} />
    </svg>
  )
}

export const IconSearch = ({ classNames, color }: IconProps) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={classNames} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.3125 15.0469L11.9503 10.684C12.6533 9.71794 13.0315 8.55366 13.0303 7.35891C13.0303 4.23176 10.4861 1.6875 7.35891 1.6875C4.23176 1.6875 1.6875 4.23176 1.6875 7.35891C1.6875 10.4861 4.23176 13.0303 7.35891 13.0303C8.55366 13.0315 9.71794 12.6533 10.684 11.9503L15.0469 16.3125L16.3125 15.0469ZM7.35891 11.2391C6.59138 11.2392 5.84106 11.0116 5.20286 10.5853C4.56465 10.1589 4.06722 9.55283 3.77346 8.84374C3.47971 8.13465 3.40283 7.35437 3.55255 6.60158C3.70227 5.8488 4.07187 5.15732 4.61459 4.61459C5.15732 4.07187 5.8488 3.70227 6.60158 3.55255C7.35437 3.40283 8.13465 3.47971 8.84374 3.77346C9.55283 4.06722 10.1589 4.56465 10.5853 5.20286C11.0116 5.84106 11.2392 6.59138 11.2391 7.35891C11.2379 8.38763 10.8287 9.37387 10.1013 10.1013C9.37387 10.8287 8.38763 11.2379 7.35891 11.2391V11.2391Z" fill={color ? color : "black"} />
    </svg>

  )
}

export const IconBookmark = ({ classNames }: IconProps) => {
  return (
    <svg width="131" height="137" viewBox="0 0 131 137" fill="none" xmlns="http://www.w3.org/2000/svg" className={classNames}>
      <g filter="url(#filter0_d_1201_5763)">
        <path d="M2 131V-5H129V131L67 105L2 131Z" fill="#FEEEBE" shapeRendering="crispEdges" />
        <path d="M2 131V-5H129V131L67 105L2 131Z" stroke="#EB3883" strokeOpacity="0.55" strokeWidth="4" strokeLinejoin="round" shapeRendering="crispEdges" />
      </g>
      <defs>
        <filter id="filter0_d_1201_5763" x="0" y="-7" width="131" height="144" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.920833 0 0 0 0 0.218698 0 0 0 0 0.513595 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1201_5763" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1201_5763" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export const IconCalendarInput = ({ classNames, color }: IconProps) => {
  return (
    <svg className={classNames} width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33333 7.76562V3.76562M18.6667 7.76562V3.76562M8.16667 11.7656H19.8333M5.83333 21.7656H22.1667C23.4553 21.7656 24.5 20.8702 24.5 19.7656V7.76562C24.5 6.66106 23.4553 5.76562 22.1667 5.76562H5.83333C4.54467 5.76562 3.5 6.66106 3.5 7.76562V19.7656C3.5 20.8702 4.54467 21.7656 5.83333 21.7656Z" stroke={color ?? "#EB3883"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const IconForward = ({ classNames, color }: IconProps) => {
  return (
    <svg width="11" height="10" viewBox="0 0 11 10" className={classNames} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.7803 5.53033C11.0732 5.23744 11.0732 4.76256 10.7803 4.46967L6.53033 0.219671C6.23744 -0.0732225 5.76256 -0.0732224 5.46967 0.219671C5.17678 0.512564 5.17678 0.987439 5.46967 1.28033L9.18934 5L5.46967 8.71967C5.17678 9.01256 5.17678 9.48744 5.46967 9.78033C5.76256 10.0732 6.23744 10.0732 6.53033 9.78033L10.7803 5.53033ZM1.53033 9.78033L5.78033 5.53033C6.07322 5.23744 6.07322 4.76256 5.78033 4.46967L1.53033 0.219672C1.23744 -0.0732218 0.762561 -0.0732218 0.469669 0.219672C0.176776 0.512564 0.176776 0.98744 0.469669 1.28033L4.18934 5L0.46967 8.71967C0.176777 9.01256 0.176777 9.48744 0.46967 9.78033C0.762563 10.0732 1.23744 10.0732 1.53033 9.78033Z" fill={color ?? "#01000A"} />
    </svg>
  )
}

export const IconUser = ({ classNames, color }: IconProps) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" className={classNames} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9998 10.4008C14.6508 10.4008 16.7998 8.25175 16.7998 5.60078C16.7998 2.94981 14.6508 0.800781 11.9998 0.800781C9.34884 0.800781 7.1998 2.94981 7.1998 5.60078C7.1998 8.25175 9.34884 10.4008 11.9998 10.4008Z" fill={color ?? "#111827"} />
      <path d="M0.799805 24.8008C0.799805 18.6152 5.81422 13.6008 11.9998 13.6008C18.1854 13.6008 23.1998 18.6152 23.1998 24.8008H0.799805Z" fill={color ?? "#111827"} />
    </svg>
  )
}

export const IconMenuDotsHorizontal = ({ classNames, color }: IconProps) => {
  return (
    <svg width="18" height="4" className={classNames} viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" fill={color ?? "#01000A"} />
      <circle cx="9" cy="2" r="2" fill={color ?? "#01000A"} />
      <circle cx="16" cy="2" r="2" fill={color ?? "#01000A"} />
    </svg>
  )
}
export const IconHand = ({ classNames, color }: IconProps) => {
  return (
    <svg width="16" height="16" className={classNames} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.43934 0.43934C7.72064 0.158035 8.10218 0 8.5 0C8.89783 0 9.27936 0.158035 9.56066 0.43934C9.74692 0.625598 9.87914 0.855797 9.94722 1.10557C10.1215 1.03648 10.3089 1 10.5 1C10.8978 1 11.2794 1.15804 11.5607 1.43934C11.842 1.72064 12 2.10218 12 2.5V3.08579C12.1591 3.02953 12.328 3 12.5 3C12.8978 3 13.2794 3.15804 13.5607 3.43934C13.842 3.72064 14 4.10218 14 4.5V10C14 10.2761 13.7761 10.5 13.5 10.5C13.2239 10.5 13 10.2761 13 10V4.5C13 4.36739 12.9473 4.24022 12.8536 4.14645C12.7598 4.05268 12.6326 4 12.5 4C12.3674 4 12.2402 4.05268 12.1464 4.14645C12.0527 4.24022 12 4.36739 12 4.5V8C12 8.27614 11.7761 8.5 11.5 8.5C11.2239 8.5 11 8.27614 11 8V2.5C11 2.36739 10.9473 2.24022 10.8536 2.14645C10.7598 2.05268 10.6326 2 10.5 2C10.3674 2 10.2402 2.05268 10.1464 2.14645C10.0527 2.24022 10 2.36739 10 2.5V7.5C10 7.77614 9.77614 8 9.5 8C9.22386 8 9 7.77614 9 7.5V1.5C9 1.36739 8.94732 1.24022 8.85355 1.14645C8.75979 1.05268 8.63261 1 8.5 1C8.36739 1 8.24022 1.05268 8.14645 1.14645C8.05268 1.24022 8 1.36739 8 1.5V7.53125C8 7.80739 7.77614 8.03125 7.5 8.03125C7.22386 8.03125 7 7.80739 7 7.53125V3C7 2.86739 6.94732 2.74022 6.85355 2.64645C6.75979 2.55268 6.63261 2.5 6.5 2.5C6.36739 2.5 6.24022 2.55268 6.14645 2.64645C6.05268 2.74022 6 2.86739 6 3V10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10V3C5 2.60218 5.15804 2.22064 5.43934 1.93934C5.72064 1.65804 6.10218 1.5 6.5 1.5C6.67197 1.5 6.8409 1.52953 7 1.58579V1.5C7 1.10217 7.15804 0.720644 7.43934 0.43934Z" fill={color ?? "#01000A"} />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.90842 7.46954C3.78812 7.26433 3.48794 7.17122 3.22209 7.3223L3.22199 7.32235C3.09638 7.39371 3.03977 7.48084 3.01521 7.58036C2.98735 7.69324 2.99325 7.86035 3.07319 8.07701L3.07368 8.07834L3.07368 8.07834L4.71557 12.5673C5.01085 13.2684 5.39936 13.8609 5.99604 14.2846C6.59357 14.7089 7.45139 15.0001 8.75004 15.0001C10.0109 15.0001 11.0554 14.5834 11.7885 13.7872C12.5251 12.9871 13 11.746 13 10.0001C13 9.72395 13.2239 9.5001 13.5 9.5001C13.7762 9.5001 14 9.72395 14 10.0001C14 11.923 13.475 13.4318 12.5241 14.4645C11.5697 15.5012 10.2392 16.0001 8.75004 16.0001C7.2987 16.0001 6.22355 15.6726 5.4171 15.1C4.61276 14.5289 4.12716 13.7502 3.78892 12.9434C3.78594 12.9363 3.78312 12.9291 3.78047 12.9218L2.13502 8.42318C2.13493 8.42295 2.13485 8.42271 2.13476 8.42248C2.00677 8.07528 1.95592 7.69906 2.04433 7.34077C2.13609 6.96892 2.36898 6.65685 2.728 6.45289M3.90842 7.46954L5.03824 10.1918C5.14409 10.4468 5.43666 10.5678 5.69171 10.4619C5.94676 10.356 6.0677 10.0635 5.96185 9.80843L4.82154 7.06093C4.81572 7.04691 4.80926 7.03316 4.80219 7.01972C4.39101 6.23849 3.42545 6.05659 2.72809 6.45284" fill={color ?? "#01000A"} />
    </svg>

  )
}

export const IconArrowUp = ({ classNames, color }: IconProps) => {
  return (
    <svg width="18" height="20" className={classNames} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.599609 18.4004C0.599609 17.7376 1.13687 17.2004 1.79961 17.2004H16.1996C16.8624 17.2004 17.3996 17.7376 17.3996 18.4004C17.3996 19.0631 16.8624 19.6004 16.1996 19.6004H1.79961C1.13687 19.6004 0.599609 19.0631 0.599609 18.4004ZM4.55108 6.04892C4.08245 5.58029 4.08245 4.82049 4.55108 4.35186L8.15108 0.751863C8.37612 0.526819 8.68135 0.400391 8.99961 0.400391C9.31787 0.400391 9.62309 0.526819 9.84814 0.751863L13.4481 4.35186C13.9168 4.82049 13.9168 5.58029 13.4481 6.04892C12.9795 6.51755 12.2197 6.51755 11.7511 6.04892L10.1996 4.49745L10.1996 13.6004C10.1996 14.2631 9.66235 14.8004 8.99961 14.8004C8.33687 14.8004 7.79961 14.2631 7.79961 13.6004L7.79961 4.49745L6.24814 6.04892C5.77951 6.51755 5.01971 6.51755 4.55108 6.04892Z" fill={color ?? "#111827"} />
    </svg>

  )
}