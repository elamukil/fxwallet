/*
 * KBX Digital Pvt Ltd ("COMPANY") CONFIDENTIAL                                *
 * Copyright (c) 2022 KBX Digital Pvt Ltd, All rights reserved                 *
 *                                                                             *
 * NOTICE:  All information contained herein is, and remains the property      *
 * of COMPANY. The intellectual and technical concepts contained herein are    *
 * proprietary to COMPANY and may be covered by Indian and Foreign Patents,    *
 * patents in process, and are protected by trade secret or copyright law.     *
 * Dissemination of this information or reproduction of this material is       *
 * strictly forbidden unless prior written permission is obtained from         *
 * COMPANY. Access to the source code contained herein is hereby forbidden     *
 * to anyone except current COMPANY employees, managers or contractors who     *
 * have executed Confidentiality and Non-disclosure agreements explicitly      *
 * covering such access.                                                       *
 *                                                                             *
 * The copyright notice above does not evidence any actual or intended         *
 * publication or disclosure of this source code, which includes               *
 * information that is confidential and/or proprietary, and is a trade secret, *
 * of COMPANY. ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC            *
 * PERFORMANCE, OR PUBLIC DISPLAY OF OR THROUGH USE OF THIS SOURCE CODE        *
 * WITHOUT THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED,      *
 * AND IN VIOLATION OF APPLICABLE LAWS AND INTERNATIONAL TREATIES. THE         *
 * RECEIPT OR POSSESSION OF THIS SOURCE CODE AND/OR RELATED INFORMATION DOES   *
 * NOT CONVEY OR IMPLY ANY RIGHTS TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS     *
 * CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT MAY DESCRIBE,    *
 * IN WHOLE OR IN PART.                                                        *
 *                                                                             *
 * File: \components\Skeleton.js                                               *
 * Project: kbxwallet                                                          *
 * Created Date: Sunday, November 13th 2022, 9:30:30 am                        *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified:                                                              *
 * Modified By:                                                                *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import React from "react";
import { View, StyleSheet, Animated} from "react-native";
import {LinearGradient} from 'expo-linear-gradient'

const Skeleton = ({width, height, style}) => {
    return  (
        <View style = {StyleSheet.flatten([
            {width: width, height: height, backGroundColor: "rgba(0, 0, 0, 0.12)"},
            style
            ])}>
            {/* <Animated.View  style={{width:"100%", height: "100%"}}> */}
                <LinearGradient style= {{width: "100%", height: "100%"}} 
                    colors = {["transparent", "rgba(0, 0, 0, 0.09)", "transparent"]}
                    start = {{x: 1, y: 1}}
                />
            {/* </Animated.View> */}
        </View>
    )
}

export default Skeleton;