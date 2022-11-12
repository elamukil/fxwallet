/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\screens\HomeComponents\TdBalance.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Saturday, November 12th 2022, 7:46:01 pm
 * Author: Hari Prasad
 *
 * Copyright (c) 2022 KBX Digital
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
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Wallet from "../../components/icons/Wallet";
import PlusIcon from "../../components/icons/PlusIcon";
import HistoryW from "../../components/icons/HistoryIconW";
import React from "react";
const { width, height } = Dimensions.get("window");
function TdBalance({ props }) {
  console.log("props", props);
  return (
    <>
      {props.map((v, i) => {
        return (
          <View style={styles.carousalView} key={i}>
            <LinearGradient
              colors={["#0092A0", "#095B6D"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.balanceContainer}
            >
              <View style={styles.balanceTitleWrap}>
                <Wallet />
                <Text style={styles.balanceTitle}>Term Deposit</Text>
              </View>
              <View style={styles.balanceTitleWrap}>
                <Text style={[styles.tenorTitle, {flex: 1}]}>
                  Account ID: {v.accountId}
                </Text>
                <Text style={styles.tenorTitle}>Tenor: {v.tenor}</Text>
              </View>
              <Text style={styles.balanceAmount}>{v.balance} MMK</Text>
              <View style={styles.addWrap}>
                <View style={styles.addMoneyBtn}>
              <Text style={styles.addMoneyText}>See transactions</Text>
            </View>
                {/* <View style={styles.historyBtn}>
              <HistoryW />
            </View> */}
              </View>
            </LinearGradient>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  carousalView: {
    width: width,
    paddingBottom: 10,
    // alignItems: "center"
  },
  balanceContainer: {
    // height: 150,
    // backgroundColor: "#095B6D"
    width: "90%",
    marginRight: 12,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#171717",
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
  tenorTitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    // marginBottom: 10
  },
  balanceAmount: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  addWrap: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
  },
  addMoneyBtn: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    borderRadius: 8,
  },
  addMoneyText: {
    color: "#0092A0",
    fontSize: 14,
    paddingLeft: 4,
    fontWeight: "bold",
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

export default TdBalance;
