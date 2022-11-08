import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_255_1279)">
        <Path
          d="M19.237 19.567A9.962 9.962 0 0112.7 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17.7 12h3a8 8 0 10-2.46 5.772l.997 1.795z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_255_1279">
          <Path fill="#fff" transform="translate(.7)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
