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
      <G clipPath="url(#clip0_255_1274)">
        <Path
          d="M16.5 17v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1h1zm5 4h-4v-2h2v-2h2v4zM3.5 3h8v8h-8V3zm2 2v4h4V5h-4zm8-2h8v8h-8V3zm2 2v4h4V5h-4zm-12 8h8v8h-8v-8zm2 2v4h4v-4h-4zm13-2h3v2h-3v-2zm-12-7h2v2h-2V6zm0 10h2v2h-2v-2zm10-10h2v2h-2V6z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_255_1274">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
