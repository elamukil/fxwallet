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
      <G clipPath="url(#clip0_255_1284)">
        <Path
          d="M12.9 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0012.9 20a7.97 7.97 0 005.167-1.892A6.978 6.978 0 0013.06 16a6.982 6.982 0 00-5.147 2.256zM6.516 16.82A8.975 8.975 0 0113.06 14a8.973 8.973 0 016.362 2.634 8 8 0 10-12.906.187v-.001zM12.9 13a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_255_1284">
          <Path fill="#fff" transform="translate(.9)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
