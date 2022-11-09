/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\PayBills.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Wednesday, November 9th 2022, 4:38:08 pm
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
      <G clipPath="url(#clip0_251_14493)">
        <Path
          d="M17 16h2V4H9v2h8v10zm0 2v3c0 .552-.45 1-1.007 1H4.007A1 1 0 013 21l.003-14c0-.552.45-1 1.007-1H7V3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1h-3zM5.003 8L5 20h10V8H5.003zM7 16h4.5a.5.5 0 000-1h-3a2.5 2.5 0 010-5H9V9h2v1h2v2H8.5a.5.5 0 000 1h3a2.5 2.5 0 010 5H11v1H9v-1H7v-2z"
          fill="#222"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_251_14493">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
