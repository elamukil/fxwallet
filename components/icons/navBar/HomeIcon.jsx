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
      <G clipPath="url(#clip0_242_1182)">
        <Path
          d="M19.1 21h-14a1 1 0 01-1-1v-9h-3l10.327-9.388a1 1 0 011.346 0L23.1 11h-3v9a1 1 0 01-1 1zm-13-2h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2h-8v-2z"
          fill="#60D675"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_242_1182">
          <Path fill="#fff" transform="translate(.1)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
