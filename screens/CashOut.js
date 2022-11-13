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
 * File: \screens\CashIn.js                                                    *
 * Project: kbxwallet                                                          *
 * Created Date: Wednesday, November 9th 2022, 6:12:30 pm                      *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified: November 13th 2022, 2:55:05 am                               *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import * as React from "react";
import { View, StyleSheet, StatusBar, Text, BackHandler } from "react-native";
import Next from "../components/icons/NextIcon"

export default function CashIn({ navigation, route }) {

  const backAction = () => {
    navigation.navigate("home", {
      phoneNumber: route.params.phoneNumber,
      pin: route.params.pin,
    });
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <Text style={styles.pageTitle}>Cash Out</Text>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.optionItem}>
          <Text onPress={() => navigation.navigate('cashout2',{phoneNumber:route.params.phoneNumber, pin: route.params.pin})} style={styles.optionText}>Agent / Merchant</Text>
          <Next style={{marginTop:4}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textColor: "#fff",
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    // padding: 16,
  },
  headerWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#0092A0",
    width: "100%",
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  pageTitle: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  optionsContainer: {
    padding: 16,
    width: "100%",
  },
  optionItem: {
    width: "100%",
    // height: 60,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  optionText: {
    color: "#333",
    fontSize: 16,
    flex: 1
  }
});
