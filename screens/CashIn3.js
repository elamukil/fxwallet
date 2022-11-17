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
 * File: \screens\CashIn3.js                                                   *
 * Project: kbxwallet                                                          *
 * Created Date: Sunday, November 13th 2022, 9:30:30 am                        *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified: November 17th 2022, 4:47:08 pm                               *
 * Modified By: Hari Prasad                                                    *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import axios from "axios";
import DailogBox from "../components/ui/DailogBox";
import BackArrow from "../components/icons/BackArrow";

const CashIn3 = ({ navigation, route }) => {
  const [amount, setAmount] = useState(0);
  const [agent, setAgent] = useState("");
  const [toPhoneNumber, setToPhoneNumber] = useState(route.params.phoneNumber);

  const amountIsValid = !isNaN(amount) && amount > 0;
  const agentIsValid = agent.trim().length > 0;
  const getAgentComp = () => {
    if (agent !== "") {
      return (
        <>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Text style={{ marginLeft: 16, marginTop: 12 }}>Cash In Request OTP: </Text>
            <Text style={{ color: "#0092A0", marginTop: 12 }}> {agent}</Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 12 }}>
            <Text style={{ marginLeft: 16 }}>Please share this OTP with Arasu & Team</Text>
            <Text style={{ marginLeft: 16, color: "#0092A0", marginTop: 12 }}>corebankingchennai@kbxdigital.com</Text>
          </View>
        </>
      );
    } else {
      return <View></View>;
    }
  };
  const backAction = () => {
    navigation.navigate("home", { phoneNumber: route.params.phoneNumber });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function getAgentCode() {
    let verifyRequest = {
      agentCode: "kbxagent",
      receiverPhoneNumber: route.params.phoneNumber,
      amount: Number(amount),
    };
    console.log(typeof pinNumber);
    console.log(verifyRequest);
    axios
      .post(
        "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/cashIn/Request",
        verifyRequest
      )
      .then((res) => {
        console.log("hello", res.data);
        setAgent(res.data.data);
        // Alert.alert(
        //   "Copy agent code!",
        //   res.data.data,
        //   [
        //     {
        //       text: "OK",
        //       onPress: () =>
        //         navigation.navigate("home", {
        //           phoneNumber: route.params.phoneNumber,
        //           pin: route.params.pin,
        //         }),
        //     },
        //   ],
        //   { cancelable: false }
        // );
      })
      .catch((err) => {
        console.log(err);
        return;
        //   Alert.alert("Enter Correct Info", 'Click Proceed to Try Again', [{text: 'Proceed', onPress:() => navigation.navigate('transfer',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})}]);
      });
  }
  const validation = () => {
    if (!amountIsValid) {
      Alert.alert("Please enter a valid amount");
      return false;
    } else {
      getAgentCode();
    }
  };

  return (
    <View style={styles.TransferContainer}>
      <View style={styles.fixedScreen}>
        <View style={{ paddingTop: 6, paddingRight: 6 }}>
          <BackArrow
            onPress={() => {
              navigation.navigate("home", {
                phoneNumber: route.params.phoneNumber,
                pin: route.params.pin,
              });
            }}
          />
        </View>
        <Text style={styles.loginText}>Cash In</Text>
      </View>
      {/* <View>
                    <Text style = {{color: '#0092A0', position: 'absolute', marginTop:80}}>Agent Short Code</Text>
            </View>
            <View style={styles.numberInput}>
                <TextInput 
                    autoFocus={true}
                    autoCapitalize='none'
                    placeholder='Enter Agent Code' 
                    placeholderTextColor="#79868F"
                    onChangeText={newText => setAgent(newText)} 
                    style={styles.loginTextInput}/>
            </View>
            <View>
                    <Text style = {{color: '#0092A0', position: 'absolute', marginTop:80}}>Mobile Number</Text>
            </View>
            <View style={styles.numberInput}>
                <TextInput  
                    // autoFocus={true}
                    keyboardType="number-pad" 
                    placeholder={toPhoneNumber}
                    editable={false}
                    placeholderTextColor="#79868F"
                    // onChangeText={phone => setToPhoneNumber(phone)} 
                    style={styles.loginTextInput}/>
            </View> */}
      <View>
        <Text style={{ color: "#0092A0", position: "absolute", marginTop: 50 }}>
          Amount
        </Text>
      </View>
      <View style={styles.numberInput}>
        <TextInput
          // autoFocus={true}
          keyboardType="number-pad"
          placeholder="Enter amount"
          placeholderTextColor="#79868F"
          onChangeText={(amt) => setAmount(amt)}
          style={styles.loginTextInput}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <PrimaryButton onPress={validation}>Request Cash In</PrimaryButton>
        {/* onPress={() => navigation.navigate('cashout',{phoneNumber:route.params.phoneNumber, pin: route.params.pin})} */}
      </View>
      {getAgentComp()}

      <DailogBox />
    </View>
  );
};

const styles = StyleSheet.create({
  TransferContainer: {
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
  },

  mobileStyle: {
    position: "absolute",
    marginTop: 100,
    width: 100,
    padding: 15,
  },
  fixedScreen: {
    // position: "absolute",
    // flexDirection: "row-reverse",
    // justifyContent: "space-between",
    // marginBottom: -70,
    display: "flex",
    flexDirection: "row",
    // marginTop: 50,
  },
  loginText: {
    textDecorationStyle: "Gilroy-Bold",
    fontSize: 25,
    // lineHeight: 48,
    color: "#0092A0",
    // marginLeft: 15,
  },
  numberInput: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontSize: 32,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    color: "#lightgrey",
    marginVertical: 8,
    fontWeight: "normal",
    marginTop: 80,
    marginBottom: -10,
  },
  loginTextInput: {
    color: "#333",
    marginTop: 20,
    flex: 1,
  },
});

export default CashIn3;
