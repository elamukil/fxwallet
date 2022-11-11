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
 * Created Date: Wednesday, November 9th 2022, 10:31:44 am                     *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified: November 11th 2022, 10:30:14 am                              *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  Pressable,
  BackHandler,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import Notification from "../components/icons/NotificationButton";
import Blob from "../components/BackgroundBlob";
import Wallet from "../components/icons/Wallet";
import Topup from "../components/icons/TopupIcon";
import Send from "../components/icons/SendIcon";
import Pay from "../components/icons/PayIcon";
import History from "../components/icons/HistoryIcon";
import UpArrow from "../components/icons/UpArrow";
import TransactionItem from "../components/TransactionItem";
import BottomNavBar from "../components/BottomNavBar";
import Kbx from "../components/icons/KBXLogo";
import Profile from "../components/icons/Profile";
import PlusIcon from "../components/icons/PlusIcon";
import { LinearGradient } from "expo-linear-gradient";
import HistoryW from "../components/icons/HistoryIconW";
import PayBills from "../components/icons/PayBills";
import CashIn from "../components/icons/CashIn"
import CashOut from "../components/icons/CashOut"

import axios from "axios";



export default function HomeScreen({ route, navigation }) {
  const [transaction, setTransaction] = useState([]);
  const [balance, setBalance] = useState([]);
  if(route.name==='home'){
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
  
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
  
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
  }

  
  useEffect(() => {
    function getTransaction() {
      axios
        .get(
          `https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/account/${route.params.phoneNumber}/transaction?fromDate=2022-11-01&toDate=2022-11-10`
        )
        .then((response) => {
          setTransaction(response.data.data);
          axios
        .get(
          `https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/${route.params.phoneNumber}/balance`
        )
        .then((response) => {
          setBalance(response.data.data);
        })
        .catch((error) => {});
        })

        .catch((error) => {});
    }
    getTransaction();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <View style={styles.profilePicture}>
          <Profile />
        </View>
        <View style={styles.titleWrap}>
          <Kbx />
        </View>
        <View>
          <View style={styles.notification}>
            <Notification />
          </View>
        </View>
      </View>
      <View style={styles.mainBody}>
        <LinearGradient
          colors={["#0092A0", "#095B6D"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.balanceContainer}
        >
          <View style={styles.balanceTitleWrap}>
            <Wallet />
            <Text style={styles.balanceTitle}>Wallet Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>{balance} MMK</Text>
          <View style={styles.addWrap}>
            <View style={styles.addMoneyBtn}>
              <PlusIcon />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </View>
            <View style={styles.historyBtn}>
              <HistoryW />
            </View>
          </View>
        </LinearGradient>
        <View style={styles.serviceWrap}>
          <View style={styles.service}>
            <View style={styles.serviceIcon}>
              <PayBills />
            </View>
            <Text style={styles.serviceName}>Pay Bills</Text>
          </View>
          <View style={styles.service}>
            <View style={styles.serviceIcon}>
              <Send onPress={() => navigation.navigate('transfer',{phoneNumber:route.params.phoneNumber, pin: route.params.pin})} />
            </View>
            <Text style={styles.serviceName}>Transfers</Text>
          </View>
          <View style={styles.service}>
            <View style={styles.serviceIcon}>
              <CashIn onPress={() => navigation.navigate('cashin')} />
            </View>
            <Text style={styles.serviceName}>Cash In</Text>
          </View>
          <View style={styles.serviceLast}>
            <View style={styles.serviceIcon}>
              <CashOut onPress={() => navigation.navigate('cashout')} />
            </View>
            <Text style={styles.serviceName}>Cash Out</Text>
          </View>
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
          <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
            {transaction.map((v, i) => {
              return <TransactionItem key={i} props={v} />;
            })}
          </ScrollView>
      </View>
      {/* <BottomNavBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textColor: "#fff",
    // backgroundColor: "#011627",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // padding: 16,
  },
  headerWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  profilePicture: {
    paddingLeft: 8,
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
  },
  textColor: {
    color: "#222222",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    paddingTop: 2,
  },
  mainBody: {
    padding: 16,
    width: "100%",
    backgroundColor: "#DDDDDD",
  },
  balanceContainer: {
    height: "auto",
    // backgroundColor: "#095B6D",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowOffset: {width: 2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,
  },
  balanceTitleWrap: {
    display: "flex",
    flexDirection: "row",
  },
  balanceTitle: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },
  addMoneyBtn: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    borderRadius: 8,
  },
  addMoneyText: {
    color: "#0092A0",
    fontSize: 14,
    paddingLeft: 4,
    fontWeight: "bold",
  },
  notification: {
    borderRadius: 8,
    padding: 8,
  },
  balanceAmount: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  serviceWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  service: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // width: 76,
    // height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  serviceLast: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  serviceName: {
    marginTop: 4,
    fontSize: 14,
    color: "#011627",
    fontWeight: "500"
  },
  transactionWrap: {
    width: "100%",
    height: "55%",
    alignSelf: "stretch",
    backgroundColor: "#fff",
    padding: 16,
  },
  transactionHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#CBDAE7",
    borderBottomWidth: 1,
  },
  transactionHeaderLeft: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginBottom: 12,
  },
  recentText: {
    color: "#0092A0",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  transactionText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionSeeAllBtn: {
    color: "#333333",
    fontSize: 14,
  },
  transactionHeaderDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "#CBDAE7",
  },
  transactionItem: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 12,
    borderBottomColor: "#CBDAE7",
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
  addWrap: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
  },
  historyBtn: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginLeft: 8,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 0.5,
  },
});
