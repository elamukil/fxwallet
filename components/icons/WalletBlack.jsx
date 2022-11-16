/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\WalletBlack.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Wednesday, November 16th 2022, 7:12:59 pm
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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_80_4340)">
        <Path
          d="M18 7h3a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h15v4zM4 9v10h16V9H4zm0-4v2h12V5H4zm11 8h3v2h-3v-2z"
          fill="#333"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_80_4340">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent