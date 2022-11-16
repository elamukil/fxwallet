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
 * File: \screens\RechargeScreens\TopUpPlan.js                                 *
 * Project: kbxwallet                                                          *
 * Created Date: Thursday, November 10th 2022, 8:59:54 pm                      *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified: November 16th 2022, 5:20:25 pm                               *
 * Modified By: Hari Prasad                                                    *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import React,{useEffect} from "react";
import { View, StyleSheet, ScrollView, BackHandler } from "react-native";
import PlanDetail from "../../components/PlanDetail";

function TopUpPlan({ navigation, route }) {
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <PlanDetail amount={1000} navigation={ navigation } route={ route } />
        <PlanDetail amount={700} navigation={ navigation } route={ route } />
        {/* <PlanDetail amount={400} navigation={ navigation } route={ route } />
        <PlanDetail amount={2000} navigation={ navigation } route={ route } />
        <PlanDetail amount={3000} navigation={ navigation } route={ route } />
        <PlanDetail amount={600} navigation={ navigation } route={ route } /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "100%",
    padding: 16,
  },
});

export default TopUpPlan;
