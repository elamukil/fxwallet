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
      <G clipPath="url(#clip0_80_4362)">
        <Path
          d="M6.546 4.257c3.928-3.219 9.733-2.995 13.4.672 3.905 3.905 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0a9.993 9.993 0 01-2.679-9.304l.077-.313 1.934.51a8 8 0 103.053-4.45l-.221.166 1.017 1.017-4.596 1.06 1.06-4.596 1.096 1.096h.001zM13.875 6v2h2.5v2h-5.5a.5.5 0 00-.09.992l.09.008h4a2.5 2.5 0 010 5h-1v2h-2v-2h-2.5v-2h5.5a.5.5 0 00.09-.992l-.09-.008h-4a2.5 2.5 0 010-5h1V6h2z"
          fill="#60D675"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_80_4362">
          <Path fill="#fff" transform="translate(.875)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
