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
 * File: \screens\Notification.js                                              *
 * Project: kbxwallet                                                          *
 * Created Date: Wednesday, November 16th 2022, 2:12:07 pm                     *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified: November 16th 2022, 2:49:30 pm                               *
 * Modified By: Hari Prasad                                                    *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import React, { useEffect, useState } from "react";
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
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import TransactionItem from "../components/TransactionItem";
import axios from "axios";

function TermDepositTransactions({ props, navigation, route }) {
  const [tdTransaction, setTransaction] = useState([]);
  useEffect(() => {
    const getTransaction = () => {
      let fullFromDate = new Date();
      fullFromDate.setDate(fullFromDate.getDate() - 15);
      let fullToDate = new Date();
      let fromDate =
        fullFromDate.getFullYear() +
        "-" +
        (fullFromDate.getMonth() + 1 < 9
          ? "0" + fullFromDate.getMonth() + 1
          : fullFromDate.getMonth() + 1) +
        "-" +
        (fullFromDate.getDate() < 9
          ? "0" + fullFromDate.getDate()
          : fullFromDate.getDate());
      let toDate =
        fullToDate.getFullYear() +
        "-" +
        (fullToDate.getMonth() + 1 < 9
          ? "0" + fullToDate.getMonth() + 1
          : fullToDate.getMonth() + 1) +
        "-" +
        (fullToDate.getDate() < 9
          ? "0" + fullToDate.getDate()
          : fullToDate.getDate());
      axios
        .get(
          `https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/${route.params.accountId}/${fromDate}/${toDate}/td/transaction`
        )
        .then((response) => {
          setTransaction(response.data.data);
          console.log("tdTrans", tdTransaction);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    getTransaction();
  });

  if (route.name === "termdeposittransaction") {
    const backAction = () => {
      navigation.navigate("home", { phoneNumber: route.params.phoneNumber });
      return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, ["termdeposittransaction"]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.transactionWrap}>
        <View style={styles.transactionHeader}>
          <View style={styles.transactionHeaderLeft}>
            <Text style={styles.recentText}>Recent</Text>
            <Text style={styles.transactionText}>Transaction</Text>
          </View>
          <Text style={styles.transactionSeeAllBtn}>See all</Text>
        </View>
        <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
          {tdTransaction.map((v, i) => {
            return <TransactionItem key={i} props={v} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: "80%",
  },
  transactionWrap: {
    width: "100%",
    height: "100%",
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
    color: "#333333",
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
});

export default TermDepositTransactions;
