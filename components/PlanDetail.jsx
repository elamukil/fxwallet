/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\PlanDetail.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Thursday, November 10th 2022, 9:09:41 pm
 * Author: Hari Prasad
 *
 * Copyright (c) 2022 KBX Digital
 */

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

function PlanDetail({ props, navigation, route, amount }) {
  return (
    <View style={styles.container}>
      <View style={styles.planHeaderWrap}>
        <View style={styles.planHeaderDetails}>
          <Text style={styles.planHeaderDetailsTitle}>VOICE</Text>
          <Text style={styles.planHeaderDetailsText}>Unlimited</Text>
        </View>
        <View style={styles.planHeaderDetails}>
          <Text style={styles.planHeaderDetailsTitle}>DATA</Text>
          <Text style={styles.planHeaderDetailsText}>2GB/ Day</Text>
        </View>
        <View style={styles.planHeaderDetails}>
          <Text style={styles.planHeaderDetailsTitle}>Validity</Text>
          <Text style={styles.planHeaderDetailsText}>96Days</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("otp", {
            phoneNumber: route.params.phoneNumber,
            amount: Number(amount),
            pin: route.params.pin,
            onPage: 'recharge',
          })}
        >
          <View style={styles.payBtn}>
            <Text style={styles.price}>{amount} MMK</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.detailsWrap}>
        <Text style={styles.detailsText}>
          JIO Diwali Celebration Offer - 75GB data
        </Text>
        {/* <Text style={styles.detailsText}>
          JIO Diwali Celebration Offer - 75GB data + Coupons from Reliance
          Digital, AJIO, ixigo, Ferns N Petals,Urban Ladder & Zoomin
        </Text> */}
      </View>
      <View style={styles.seeWrap}>
        {/* <Text style={styles.seeText}>See Details</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    padding: 16,
    borderRadius: 8,
    borderColor: "#CBDAE7",
    borderWidth: 1,
    marginBottom: 16,
  },
  planHeaderWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#CBDAE7",
    borderBottomWidth: 1,
  },
  planHeaderDetails: {
    display: "flex",
    flexDirection: "column",
    flec: 1,
    // padding: 8,
    paddingBottom: 8,
    alignItems: "center",
  },
  planHeaderDetailsTitle: {
    color: "#888888",
    fontSize: 10,
    fontWeight: "400",
  },
  planHeaderDetailsText: {
    fontSize: 12,
    fontWeight: "500",
  },
  detailsWrap: {
    paddingTop: 8,
  },
  detailsText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888888",
    fontWeight: "bold"
  },
  seeWrap: {
    paddingTop: 8,
  },
  seeText: {
    fontSize: 12,
    color: "#333",
  },
  payBtn: {
    width: 100,
    height: 32,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  price: {
    color: "#fff",
  },
});

export default PlanDetail;
