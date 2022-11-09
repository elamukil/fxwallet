/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\icons\NotificationButton.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Wednesday, November 9th 2022, 10:31:44 am
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
      <G clipPath="url(#clip0_251_14547)">
        <Path
          d="M18 10a6 6 0 10-12 0v8h12v-8zm2 8.667l.4.533a.5.5 0 01-.4.8H4a.5.5 0 01-.4-.8l.4-.533V10a8 8 0 0116 0v8.667zM9.5 21h5a2.5 2.5 0 01-5 0z"
          fill="#011627"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_251_14547">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
