type Props = {
  size?: number;
};
const Comma = ({ size = 60 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 62 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M61.8008 16.4971C61.8008 32.8545 53.5407 47.4622 37.0205 60.3203C37.0205 53.5658 36.9798 49.7816 36.8984 48.9678C36.5729 45.7126 35.4336 43.4339 33.4805 42.1318C34.5384 41.6436 36.2067 40.5856 38.4854 38.958C42.7171 34.8076 44.833 30.9421 44.833 27.3613C38.1598 25.571 34.8232 21.0137 34.8232 13.6895C34.8232 9.94596 36.0846 6.77214 38.6074 4.16797C41.1302 1.48242 44.2633 0.139648 48.0068 0.139648C52.4014 0.139648 55.86 1.80794 58.3828 5.14453C60.6615 8.1556 61.8008 11.9398 61.8008 16.4971ZM28.8418 16.4971C28.8418 32.8545 20.5817 47.4622 4.06152 60.3203C4.06152 53.5658 4.02083 49.7816 3.93945 48.9678C3.61393 45.7126 2.47461 43.4339 0.521484 42.1318C1.57943 41.6436 3.24772 40.5856 5.52637 38.958C9.75814 34.8076 11.874 30.9421 11.874 27.3613C5.20085 25.571 1.86426 21.0137 1.86426 13.6895C1.86426 9.94596 3.12565 6.77214 5.64844 4.16797C8.17122 1.48242 11.3044 0.139648 15.0479 0.139648C19.4424 0.139648 22.901 1.80794 25.4238 5.14453C27.7025 8.1556 28.8418 11.9398 28.8418 16.4971Z"
        fill="black"
      ></path>
    </svg>
  );
};

export default Comma;
