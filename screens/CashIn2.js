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
 * Last Modified: November 12th 2022, 4:23:20 am                               *
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
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  Pressable,
  BackHandler,
} from "react-native";
import PrimaryButton from '../components/ui/PrimaryButton'

export default function CashIn({ navigation, route }) {
  const backAction = () => {
    navigation.navigate("cashin", {
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
        <Text style={styles.pageTitle}>Cash In</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Text style={styles.faqText}>How to Cash in at Agent / Merchant?</Text>
        {/* <Image style={{width: "100%", height: "60%", resizeMode: 'contain'}} source={require("../assets/images/faqCashIn.png")} /> */}
        <View style={styles.instructionWrap}>
          <Image
            style={{ width: "40%", resizeMode: "contain" }}
            source={require("../assets/images/find.png")}
          />
          <View style={styles.instructions}>
            <Text style={styles.instructionsTitle}>
              1. Find nearby agent or merchant
            </Text>
            <Text>
              Click "Nearby agents/merchants" button on this page or"Nearby"
              button on homepage to find an agent or merchat.
            </Text>
          </View>
        </View>
        <View style={styles.instructionWrap}>
          <Image
            style={{ width: "40%", resizeMode: "contain" }}
            source={require("../assets/images/request.png")}
          />
          <View style={styles.instructions}>
            <Text style={styles.instructionsTitle}>
              2. Request e-money that you want to cash in from the agent or
              merchant
            </Text>
            <Text>
              Click "I am at an agent/merchant" button on this page. Then, enter
              amount that you want to cash in and click "Generate QR code",
              Finally, let the agent/merchant scan your QR code.
            </Text>
          </View>
        </View>
        <View style={styles.instructionWrap}>
          <Image
            style={{ width: "40%", resizeMode: "contain" }}
            source={require("../assets/images/transfer.png")}
          />
          <View style={styles.instructions}>
            <Text style={styles.instructionsTitle}>3. Finish cash in</Text>
            <Text>
              You will recieve e~money and SMS of cash in successfully. Can
              check balance in homepage as well.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerBtn}>
          <PrimaryButton onPress= {()=>navigation.navigate('cashin3',{phoneNumber:route.params.phoneNumber, pin: route.params.pin})}>I am at agent/merchant</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textColor: "#fff",
    backgroundColor: "#fff",
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
    fontWeight: "bold",
  },
  optionsContainer: {
    padding: 16,
    width: "100%",
  },
  faqText: {
    fontSize: 18,
    color: "#0092A0",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  footerBtn: {
    padding: 8,
    backgroundColor: "#0092A0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  instructionWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "70%",
    justifyContent: "space-between"
  },
  instructions: {
    padding: 8,
  },
  instructionsTitle: {
    fontWeight: "bold",
  },
});
