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
function TdBalance({props, phoneNumber, pin, navigation, route}) {
  return (
    <View style={styles.carousalView}>
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
        <Text style={styles.balanceAmount}> Exciting Term Deposit</Text>
        <View style={styles.addWrap}>
          <Pressable
            onPress={() =>
              navigation.navigate("termdeposit", {
                phoneNumber: phoneNumber,
                pin: pin,
              })
            }
          >
            <View style={styles.addMoneyBtn}>
              <PlusIcon />
              <Text style={styles.addMoneyText}>Create Deposit</Text>
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  carousalView: {
    width: width,
    // paddingBottom: 10,
    paddingRight: 16,
    paddingLeft: 16,
    alignItems: "center"
  },
  balanceContainer: {
    height: "auto",
    // backgroundColor: "#095B6D"
    width: "100%",
    // marginLeft: 16,
    borderRadius: 8,
    padding: 16,
    // marginBottom: 24,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: 150,
    justifyContent: "center"
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
  balanceAmount: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: -8,
  },
  addWrap: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
    // marginLeft: 4
  },
  addMoneyBtn: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
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
