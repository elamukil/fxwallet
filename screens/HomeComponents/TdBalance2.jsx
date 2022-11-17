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
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Wallet from "../../components/icons/Wallet";
import PlusIcon from "../../components/icons/PlusIcon";
import HistoryW from "../../components/icons/HistoryIconW";
import React, { useEffect, useState } from "react";
import axios from "axios";
const { width, height } = Dimensions.get("window");
function TdBalance({ props, phoneNumber, pin, navigation, route }) {
  const [tdList, setTdList] = useState([]);
  const [flag, setflag] = useState(false);
  // console.log("props", props);
  useEffect(() => {
    const tsCall = () => {
      axios
        .get(
          `https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/${route.params.phoneNumber}`
        )
        .then((response) => {
          setTdList(response.data.TDDetails);
          console.log("tdList2", response.data.TDDetails);
        })
        .catch((error) => {
          console.log("");
        });
    };
    tsCall()
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/${route.params.phoneNumber}`
      )
      .then((response) => {
        setTdList(response.data.TDDetails);
        console.log("tdList2", response.data.TDDetails);
      })
      .catch((error) => {
        console.log("");
      });
  }, [flag]);
  console.log("tdList", tdList);
  function closeAccount(principalAmount, accountId) {
    console.log("principalAmount", principalAmount);
    Alert.alert(
      "Do you really want to close account?",
      "Click OK to Continue",
      [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: () => {
            let verifyRequest = {
              requestType: "TDC",
              fromAccounts: [
                { phoneNumber: accountId, amount: principalAmount },
              ],
              toAccounts: [
                {
                  phoneNumber: route.params.phoneNumber,
                  amount: principalAmount,
                },
              ],
            };
            console.log("verifyRequest", verifyRequest);
            axios
              .post(
                "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/transfer",
                verifyRequest
              )
              .then((res) => {
                console.log("hello", res.data);
                let verifyRequest1 = {
                  accountId: accountId,
                };
                axios
                  .put(
                    "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/td/status",
                    verifyRequest1
                  )
                  .then((response) => {
                    console.log("deleted", response.data);
                    Alert.alert(
                      "Account closed successfully",
                      "Click ok to Continue",
                      [
                        {
                          text: "Ok",
                          onPress: () => setflag(true),
                          // navigation.navigate("refresh", {
                          //   phoneNumber: route.params.phoneNumber,
                          //   pin: route.params.pin,
                          // })
                        },
                      ]
                    );
                  })
                  .catch((error) => {
                    console.log("not deleted");
                  });
              })
              .catch((err) => {
                console.log(err);
                Alert.alert(
                  err.response.data.data,
                  "Click Proceed to Try Again",
                  [
                    {
                      text: "Proceed",
                      onPress: () =>
                        navigation.navigate("transfer", {
                          phoneNumber: route.params.phoneNumber,
                          pin: pinNumber,
                        }),
                    },
                  ]
                );
              });
          },
        },
      ]
    );
  }
  return (
    <>
      {tdList.map((v, i) => {
        return v.balance ? (
          <View style={styles.carousalView} key={i}>
            <LinearGradient
              colors={["#0092A0", "#095B6D"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.balanceContainer}
            >
              {/* <View style={styles.balanceTitleWrap}>
                <Wallet />
                <Text style={styles.balanceTitle}>Term Deposit</Text>
              </View> */}
              <View style={styles.balanceTitleWrap}>
                <Text style={[styles.tenorTitle, { flex: 1 }]}>
                  Account ID: {v.accountId}
                </Text>
                <Text style={styles.tenorTitle}>Tenure: {v.tenor}</Text>
              </View>
              <Text style={styles.balanceAmount}>{v.balance} MMK</Text>
              <View style={styles.addWrap}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("termdeposittransaction", {
                      phoneNumber: phoneNumber,
                      accountId: v.accountId,
                      pin: pin,
                    })
                  }
                  style={{ flex: 1 }}
                >
                  <View style={styles.addMoneyBtn}>
                    <Text style={styles.addMoneyText}>Transactions</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    closeAccount(v.balance, v.accountId);
                  }}
                >
                  <View style={styles.historyBtn}>
                    <Text style={styles.historyBtnText}>Close deposit</Text>
                  </View>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        ) : (
          ""
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  carousalView: {
    width: width,
    // paddingBottom: 10,
    paddingRight: 16,
    paddingLeft: 16,
    alignItems: "center",
  },
  balanceContainer: {
    // height: 150,
    // backgroundColor: "#095B6D"
    width: "100%",
    // marginRight: 12,
    borderRadius: 8,
    padding: 16,
    // marginBottom: 24,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    minHeight: 150
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
    // display: "flex",
    // flexDirection: "row",
    backgroundColor: "#fff",
    // justifyContent: "center",
    alignItems: "center",
    width: "auto",
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10
    // height: 
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
  historyBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TdBalance;
