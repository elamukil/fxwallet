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
 * File: \screens\TransferScreen.js                                            *
 * Project: kbxwallet                                                          *
 * Created Date: Wednesday, November 9th 2022, 11:52:01 am                     *
 * Author: Tamil Elamukil <tamil@kbxdigital.com>                               *
 * -----                                                                       *
 * Last Modified: November 14th 2022, 2:20:14 pm                               *
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const TransferScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [toPhoneNumber, setToPhoneNumber] = useState(0);

  const amountIsValid = !isNaN(amount) && amount > 0;
  const descriptionIsValid = description.trim().length > 0;
  const toPhoneNumberIsValid = toPhoneNumber.length == 10;
  const validation = () => {
    if (!toPhoneNumberIsValid) {
      Alert.alert("Please enter a valid phone number");
      return false;
    }
    else if (!amountIsValid) {
      Alert.alert("Please enter a valid amount");
      return false;
    }
    else {
      navigation.navigate("otp", {
        phoneNumber: route.params.phoneNumber,
        amount: amount,
        toPhoneNumber: toPhoneNumber,
        description: description,
        onPage: route.name,
      });
    }
  };

  // function nextPage(){
  //     navigation.navigate('otp',{phoneNumber: route.params.phoneNumber,amount: amount,toPhoneNumber:toPhoneNumber,description:description, onPage: route.name})
  // }

  if (route.name === "transfer") {
    const backAction = () => {
      navigation.navigate("home", { phoneNumber: route.params.phoneNumber });
      return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, ["transfer"]);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.TransferContainer}>
        <View style={styles.fixedScreen}>
          <Text style={styles.loginText}>Transfer</Text>
        </View>
        <View>
          <Text
            style={{ color: "#0092A0", position: "absolute", marginTop: 80 }}
          >
            Mobile Number
          </Text>
        </View>
        <View style={styles.numberInput}>
          <TextInput
            maxLength={10}
            autoFocus={true}
            keyboardType="number-pad"
            placeholder="Enter mobile Number"
            placeholderTextColor="#79868F"
            onChangeText={(newText) => setToPhoneNumber(newText)}
            style={styles.loginTextInput}
          />
        </View>
        <View>
          <Text
            style={{ color: "#0092A0", position: "absolute", marginTop: 80 }}
          >
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
        <View>
          <Text
            style={{ color: "#0092A0", position: "absolute", marginTop: 80 }}
          >
            Description
          </Text>
        </View>
        <View style={styles.numberInput}>
          <TextInput
            // autoFocus={true}
            placeholder="what this transfer for?"
            placeholderTextColor="#79868F"
            onChangeText={(newText) => setDescription(newText)}
            style={styles.loginTextInput}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <PrimaryButton
            onPress={() => {
              validation();
            }}
          >
            Transfer
          </PrimaryButton>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    position: "absolute",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: -70,
  },
  loginText: {
    textDecorationStyle: "Gilroy-Bold",
    fontSize: 25,
    lineHeight: 48,
    color: "#0092A0",
    marginLeft: 15,
    marginTop: 50,
  },
  numberInput: {
    height: 50,
    // width: 350,
    fontSize: 32,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    color: "#lightgrey",
    marginVertical: 8,
    fontWeight: "normal",
    marginTop: 100,
    marginBottom: -10,
  },
  loginTextInput: {
    color: "#333",
    marginTop: 20,
  },
});

export default TransferScreen;
