import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

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
      <G clipPath="url(#clip0_80_4347)">
        <Path
          d="M20.125 8V5h-16v3h16zm0 2h-16v9h16v-9zm-17-7h18a1 1 0 011 1v16a1 1 0 01-1 1h-18a1 1 0 01-1-1V4a1 1 0 011-1zM14 11.5V14h1l-3 3-3-3h1v-2.5h4z"
          fill="#60D675"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_80_4347">
          <Path fill="#fff" transform="translate(.125)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
