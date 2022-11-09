/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\PlusIcon.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Wednesday, November 9th 2022, 1:37:15 pm
 * Author: Hari Prasad
 * 
 * Copyright (c) 2022 KBX Digital
 */

import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_251_14482)">
        <Path
          d="M9.167 9.667V6.333h1.666v3.334h3.334v1.666h-3.334v3.334H9.167v-3.334H5.833V9.667h3.334zM10 18.833a8.333 8.333 0 110-16.666 8.333 8.333 0 110 16.666zm0-1.666a6.667 6.667 0 100-13.334 6.667 6.667 0 000 13.334z"
          fill="#0092A0"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_251_14482">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
