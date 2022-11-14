/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\DownArrow.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Monday, November 14th 2022, 3:47:39 pm
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
      <G clipPath="url(#clip0_648_3334)">
        <Path
          d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"
          fill="#D95959"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_648_3334">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
