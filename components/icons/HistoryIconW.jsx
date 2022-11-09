/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\HistoryIconW.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Wednesday, November 9th 2022, 4:01:07 pm
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
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_251_14487)">
        <Path
          d="M10 1.667A8.333 8.333 0 0118.333 10a8.333 8.333 0 11-16.666 0h1.666a6.667 6.667 0 101.154-3.75h2.18v1.667h-5v-5h1.666V5A8.317 8.317 0 0110 1.667zm.833 4.166v3.821l2.703 2.703-1.18 1.179-3.19-3.192v-4.51h1.667z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_251_14487">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
