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
 * File: \screens\HomeScreen.js                                                *
 * Project: kbxwallet                                                          *
 * Created Date: Tuesday, November 8th 2022, 12:21:23 pm                       *
 * Author: Kumaragurubaran Kanagaraj <kumaraguru.kanagaraj@kbxdigital.com>     *
 * -----                                                                       *
 * Last Modified: November 8th 2022, 12:47:38 pm                               *
 * Modified By: Kumaragurubaran Kanagaraj                                      *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

// import { StatusBar } from 'expo-status-bar';
// import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import KbxText from '../components/KbxText';
import Notification from "../components/NotificationButton";
import Blob from "../components/BackgroundBlob";
import Wallet from "../components/icons/Wallet";
import Topup from "../components/icons/TopupIcon";
import Send from "../components/icons/SendIcon";
import Pay from "../components/icons/PayIcon";
import History from "../components/icons/HistoryIcon";
import UpArrow from "../components/icons/UpArrow";
import TransactionItem from "../components/TransactionItem";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.blobPosition}>
        <Image source={require("../assets/images/Group.png")}></Image>
      </View>
      <View style={styles.headerWrap}>
        <View style={styles.titleWrap}>
          <Text style={styles.logoText}>KBX</Text>
          <Text style={styles.textColor}>Wallet</Text>
        </View>
        <View>
          <View style={styles.notification}>
            <Notification />
          </View>
        </View>
      </View>
      <View style={styles.balanceTitleWrap}>
        <Wallet />
        <Text style={styles.balanceTitle}>Wallet Balance</Text>
      </View>
      <Text style={styles.balanceAmount}>25,960,213 MMK</Text>
      <View style={styles.serviceWrap}>
        <View style={styles.service}>
          <Topup />
          <Text style={styles.serviceName}>Top Up</Text>
        </View>
        <View style={styles.service}>
          <Send />
          <Text style={styles.serviceName}>Send</Text>
        </View>
        <View style={styles.service}>
          <Pay />
          <Text style={styles.serviceName}>Pay</Text>
        </View>
        <View style={styles.serviceLast}>
          <History />
          <Text style={styles.serviceName}>History</Text>
        </View>
      </View>
      <View style={styles.transactionWrap}>
        <View style={styles.transactionHeader}>
          <View style={styles.transactionHeaderLeft}>
            <Text style={styles.recentText}>Recent</Text>
            <Text style={styles.transactionText}>Transaction</Text>
          </View>
          <Text style={styles.transactionSeeAllBtn}>See all</Text>
        </View>
        {/* <View style={styles.transactionItem}>
            <View style={styles.transactionItemLeft}>
              <View style={styles.transactionItemProfile}>
                <Image source={require("./assets/images/profile.png")}></Image>
              </View>
              <View>
                <Text style={styles.transactionItemName}>Jeevan Raj</Text>
                <Text style={styles.transactionItemId}>Ref: 109873673933</Text>
              </View>
            </View>
            <View style={styles.transactionItemRight}>
              <Text style={styles.transactionAmount}>50,000 MMK</Text>
              <UpArrow />
            </View>
          </View> */}
        <TransactionItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textColor: "#fff",
    backgroundColor: "#011627",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    padding: 16,
  },
  headerWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -120,
    marginBottom: 50,
  },
  blobPosition: {
    width: "110%",
  },
  logoText: {
    color: "#60D675",
    fontSize: 24,
    marginRight: 8,
    fontWeight: "bold",
  },
  titleWrap: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginRight: -36,
  },
  textColor: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  balanceTitleWrap: {
    display: "flex",
    flexDirection: "row",
  },
  balanceTitle: {
    color: "#60D675",
    marginLeft: 10,
    fontSize: 18,
  },
  notification: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  balanceAmount: {
    fontSize: 32,
    color: "#fff",
    marginTop: 14,
    fontWeight: "bold",
    marginBottom: 48,
  },
  serviceWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  service: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 76,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    marginRight: 10,
  },
  serviceLast: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 76,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
  },
  serviceName: {
    fontSize: 16,
    color: "#fff",
  },
  transactionWrap: {
    width: "100%",
    height: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginTop: 24,
    borderRadius: 8,
    padding: 16,
  },
  transactionHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#60D675",
    borderBottomWidth: 1,
  },
  transactionHeaderLeft: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginBottom: 12,
  },
  recentText: {
    color: "#60D675",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  transactionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionSeeAllBtn: {
    color: "#fff",
    fontSize: 14,
  },
  transactionHeaderDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "#60D675",
  },
  transactionItem: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 12,
    borderBottomColor: "#3B4C5A",
    borderBottomWidth: 2,
    // paddingBottom: 8,
  },
  transactionItemLeft: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
  },
  transactionItemProfile: {
    marginRight: 8,
  },
  transactionItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  transactionItemId: {
    fontSize: 10,
    color: "#79868F",
  },
  transactionItemRight: {
    display: "flex",
    flexDirection: "row",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
});
