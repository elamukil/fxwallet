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
      <G clipPath="url(#clip0_255_1269)">
        <Path
          d="M12.3 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-7h9v2h-4v3l-5-5zm5-4V6l5 5h-9V9h4z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_255_1269">
          <Path fill="#fff" transform="translate(.3)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
