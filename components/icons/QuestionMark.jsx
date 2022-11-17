/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\QuestionMark.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Thursday, November 10th 2022, 12:55:42 pm
 * Author: Hari Prasad
 * 
 * Copyright (c) 2022 KBX Digital
 */

import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_452_2303)">
        <Path
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16.001A8 8 0 0012 20zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 011-1 1.5 1.5 0 10-1.471-1.794l-1.962-.393A3.5 3.5 0 1113 13.355z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_452_2303">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
