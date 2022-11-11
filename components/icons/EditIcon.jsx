/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\EditIcon.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Thursday, November 10th 2022, 3:33:41 pm
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
      <G clipPath="url(#clip0_452_3320)">
        <Path
          d="M13.107 8.072l-1.179-1.179-7.761 7.762v1.178h1.178l7.762-7.761zm1.178-1.179l1.178-1.178-1.178-1.178-1.178 1.178 1.178 1.178zM6.035 17.5H2.5v-3.536L13.696 2.768a.833.833 0 011.178 0l2.358 2.358a.833.833 0 010 1.178L6.036 17.5h-.001z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_452_3320">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
