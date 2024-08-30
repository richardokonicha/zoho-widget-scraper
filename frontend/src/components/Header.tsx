function Svg() {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" className="inline-block mr-3">
      <g clipPath="url(#clip0_147_175842)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.5 13.5C0.5 6.87258 5.87258 1.5 12.5 1.5C19.0024 1.5 24.2968 6.67176 24.4943 13.1262L24.4994 21.4994C24.4997 22.0519 24.0519 22.5 23.4994 22.5H1.5C0.947716 22.5 0.5 22.0523 0.5 21.5L0.5 13.5ZM13.6256 3.81424L13.625 5.17324C13.625 5.78184 13.1213 6.27521 12.5 6.27521C11.9305 6.27521 11.4598 5.86065 11.3853 5.32277L11.375 5.17324L11.3747 3.81424C9.94806 3.97819 8.61506 4.45013 7.4439 5.16201L8.19386 6.00472C8.603 6.46274 8.55562 7.15892 8.08803 7.55969C7.66295 7.92402 7.03692 7.91879 6.61921 7.57071L6.50056 7.45602L5.67734 6.53553C4.65716 7.53538 3.85562 8.75782 3.35115 10.1246L4.6411 10.3068C5.25617 10.3929 5.68356 10.9511 5.59569 11.5536C5.51515 12.1059 5.0296 12.5037 4.47547 12.4998L4.3229 12.4886L2.82629 12.2791C2.79014 12.5676 2.76657 12.8601 2.75615 13.1559L2.75268 13.3575L2.756 13.5L2.75 20.2485H22.2485L22.2438 13.1503C22.2335 12.8565 22.2101 12.5661 22.1744 12.2795L20.6842 12.4886L20.5317 12.4998C19.9775 12.5037 19.492 12.1059 19.4114 11.5536C19.3309 11.0013 19.6833 10.4863 20.2164 10.338L20.366 10.3068L21.65 10.125C21.1477 8.76348 20.3501 7.54492 19.335 6.54695L18.5217 7.45602L18.403 7.57071C17.9853 7.91879 17.3593 7.92402 16.9342 7.55969C16.5091 7.19535 16.4313 6.58687 16.7281 6.13513L16.8284 6.00472L17.5725 5.17173C16.3975 4.45454 15.0588 3.97903 13.6256 3.81424ZM14.8235 7.93828C15.3615 8.12522 15.6672 8.6795 15.5573 9.22264L15.5169 9.37021L14.6079 11.989C15.3803 12.6075 15.875 13.5585 15.875 14.625C15.875 16.489 14.364 18 12.5 18C10.636 18 9.125 16.489 9.125 14.625C9.125 12.7671 10.6263 11.2598 12.482 11.25L13.3915 8.63171C13.5955 8.04481 14.2366 7.73435 14.8235 7.93828ZM12.5 13.5C11.8787 13.5 11.375 14.0037 11.375 14.625C11.375 15.2463 11.8787 15.75 12.5 15.75C13.1213 15.75 13.625 15.2463 13.625 14.625C13.625 14.0037 13.1213 13.5 12.5 13.5Z"
          fill="#0F1013"
        />
      </g>
      <defs>
        <clipPath id="clip0_147_175842">
          <rect width="24" height="24" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-dash p-4 justify-center items-center hidden md:flex">
      <Svg />
      <h1 className="font-head text-2xl ">Booking Search Zoho Widget</h1>
    </header>
  );
}

export default Header;