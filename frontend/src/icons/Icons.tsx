export interface IconProps {
  classNames?: string;
  rotate?: boolean;
  color?: string;
}

export const IconArrow = ({ rotate, classNames, color }: IconProps) => {
  return (
    <svg
      width='32px' height='32px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'
      rotate={rotate ? '180deg' : ''} className={classNames}
    >
      <path
        d='M10.0001 6L8.59009 7.41L13.1701 12L8.59009 16.59L10.0001 18L16.0001 12L10.0001 6Z'
        fill={color ?? '#F2F2F2'}
      />
    </svg>
  );
};

export const IconInfo = ({ classNames }: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={classNames}
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11ZM11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM11 7C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5C10.4477 5 10 5.44772 10 6C10 6.55228 10.4477 7 11 7ZM12 9V10V16V17H10V16V10V9H12Z" fill="black" />
    </svg>

  )
}

export const IconTrash = ({ classNames }: IconProps) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={classNames}
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_748_3158)">
        <path d="M14.589 5.625H3.41025C3.35803 5.62479 3.30634 5.63548 3.2585 5.6564C3.21065 5.67732 3.1677 5.70801 3.1324 5.74649C3.0971 5.78496 3.07022 5.83039 3.05349 5.87986C3.03676 5.92933 3.03055 5.98174 3.03525 6.03375L4.0005 16.6357C4.03438 17.0086 4.20644 17.3552 4.48287 17.6077C4.75931 17.8601 5.12015 18 5.4945 18H12.5048C12.8791 18 13.2399 17.8601 13.5164 17.6077C13.7928 17.3552 13.9649 17.0086 13.9988 16.6357L14.9625 6.03375C14.9671 5.98189 14.9609 5.92964 14.9443 5.88032C14.9276 5.83099 14.9009 5.78567 14.8657 5.74725C14.8306 5.70877 14.7879 5.67802 14.7403 5.65698C14.6926 5.63593 14.6411 5.62504 14.589 5.625ZM7.689 15.375C7.689 15.5242 7.62974 15.6673 7.52425 15.7727C7.41876 15.8782 7.27568 15.9375 7.1265 15.9375C6.97732 15.9375 6.83424 15.8782 6.72875 15.7727C6.62326 15.6673 6.564 15.5242 6.564 15.375V8.625C6.564 8.47582 6.62326 8.33274 6.72875 8.22725C6.83424 8.12176 6.97732 8.0625 7.1265 8.0625C7.27568 8.0625 7.41876 8.12176 7.52425 8.22725C7.62974 8.33274 7.689 8.47582 7.689 8.625V15.375ZM11.439 15.375C11.439 15.5242 11.3797 15.6673 11.2742 15.7727C11.1688 15.8782 11.0257 15.9375 10.8765 15.9375C10.7273 15.9375 10.5842 15.8782 10.4788 15.7727C10.3733 15.6673 10.314 15.5242 10.314 15.375V8.625C10.314 8.47582 10.3733 8.33274 10.4788 8.22725C10.5842 8.12176 10.7273 8.0625 10.8765 8.0625C11.0257 8.0625 11.1688 8.12176 11.2742 8.22725C11.3797 8.33274 11.439 8.47582 11.439 8.625V15.375ZM16.5 3H12.9375C12.8878 3 12.8401 2.98025 12.8049 2.94508C12.7698 2.90992 12.75 2.86223 12.75 2.8125V1.875C12.75 1.37772 12.5525 0.900805 12.2008 0.549175C11.8492 0.197544 11.3723 0 10.875 0H7.125C6.62772 0 6.15081 0.197544 5.79917 0.549175C5.44754 0.900805 5.25 1.37772 5.25 1.875V2.8125C5.25 2.86223 5.23025 2.90992 5.19508 2.94508C5.15992 2.98025 5.11223 3 5.0625 3H1.5C1.30109 3 1.11032 3.07902 0.96967 3.21967C0.829018 3.36032 0.75 3.55109 0.75 3.75C0.75 3.94891 0.829018 4.13968 0.96967 4.28033C1.11032 4.42098 1.30109 4.5 1.5 4.5H16.5C16.6989 4.5 16.8897 4.42098 17.0303 4.28033C17.171 4.13968 17.25 3.94891 17.25 3.75C17.25 3.55109 17.171 3.36032 17.0303 3.21967C16.8897 3.07902 16.6989 3 16.5 3ZM6.75 2.8125V1.875C6.75 1.77554 6.78951 1.68016 6.85983 1.60984C6.93016 1.53951 7.02554 1.5 7.125 1.5H10.875C10.9745 1.5 11.0698 1.53951 11.1402 1.60984C11.2105 1.68016 11.25 1.77554 11.25 1.875V2.8125C11.25 2.86223 11.2302 2.90992 11.1951 2.94508C11.1599 2.98025 11.1122 3 11.0625 3H6.9375C6.88777 3 6.84008 2.98025 6.80492 2.94508C6.76975 2.90992 6.75 2.86223 6.75 2.8125Z" fill="black" />
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