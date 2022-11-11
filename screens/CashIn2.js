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
 * Last Modified: November 10th 2022, 7:51:52 pm                               *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import React from "react";
import { View, StyleSheet, StatusBar, Text, Image, Pressable } from "react-native";

export default function CashIn({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <Text style={styles.pageTitle}>Cash In</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Text style={styles.faqText}>How to Cash in at Agent / Merchant?</Text>
        <Image style={{width: "100%", height: "60%", resizeMode: 'contain'}} source={require("../assets/images/faqCashIn.png")} />
      </View>
      <View style={styles.footer}>
          <View style={styles.footerBtn}>
              <Text style={styles.footerText}>I am at agent/merchant</Text>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  optionsContainer: {
    padding: 16,
    width: "100%",
  },
  faqText: {
    fontSize: 18,
    color: "#0092A0",
    fontWeight: "bold"
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  footerBtn: {
    padding: 8,
    backgroundColor: "#0092A0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
