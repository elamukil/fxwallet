/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\BackArrowWhite.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Thursday, November 17th 2022, 7:47:42 am
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
      <G clipPath="url(#clip0_384_5358)">
        <Path
          d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414L7.828 11z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_384_5358">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent