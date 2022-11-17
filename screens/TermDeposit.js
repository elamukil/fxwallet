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
 * File: \screens\TermDeposit.js                                               *
 * Project: kbxwallet                                                          *
 * Created Date: Saturday, November 12th 2022, 9:07:07 pm                      *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified: November 17th 2022, 7:40:34 pm                               *
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
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackArrow from "../components/icons/BackArrow"

const TransferScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState(0);
  const [tenor, setTenor] = useState(0);
  const [selectedValue, setSelectedValue] = useState("SI");

  const amountIsValid = !isNaN(amount) && amount > 0;
  const tenorIsValid = Number(tenor) > 0;

  const validation = () => {
    if (!tenorIsValid) {
      Alert.alert("Please enter a valid Tenure");
      return false;
    } else if (!amountIsValid) {
      Alert.alert("PLease enter a valid Amount");
      return false;
    } else {
      navigation.navigate("otp", {
        phoneNumber: route.params.phoneNumber,
        principalAmount: amount,
        tenor: tenor,
        calculationType: selectedValue,
        onPage: route.name,
      });
    }
  };

  if (route.name === "termdeposit") {
    const backAction = () => {
      navigation.navigate("home", { phoneNumber: route.params.phoneNumber });
      return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, ["termdeposit"]);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.TransferContainer}>
        <View style={styles.fixedScreen}>
        <View style={{ paddingTop: 6, paddingRight: 6 }}>
            <BackArrow onPress={() => navigation.goBack(null)} />
          </View>
          <Text style={styles.loginText}>Term Deposit</Text>
        </View>
        <View>
          <Text
            style={{ color: "#0092A0", position: "absolute", marginTop: 50 }}
          >
            Tenure
          </Text>
        </View>
        <View style={styles.numberInput}>
          {/* <TextInput
            maxLength={10}
            autoFocus={true}
            keyboardType="number-pad"
            placeholder="Enter tenure"
            placeholderTextColor="#79868F"
            onChangeText={(newText) => setTenor(newText)}
            style={styles.loginTextInput}
          /> */}
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>
              setTenor(itemValue)
            }
          >
            <Picker.Item label="5" value="5" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="40" value="40" />
            {/* <Picker.Item label="JavaScript" value="js" /> */}
          </Picker>
        </View>
        <View>
          <Text
            style={{ color: "#0092A0", position: "absolute", marginTop: 50 }}
          >
            Principle Amount
          </Text>
        </View>
        <View style={styles.numberInput}>
          <TextInput
            // autoFocus={true}
            keyboardType="number-pad"
            placeholder="Enter principle amount"
            placeholderTextColor="#79868F"
            onChangeText={(amt) => setAmount(amt)}
            style={styles.loginTextInput}
          />
        </View>
        <View>
          <Text
            style={{ color: "#0092A0", position: "absolute", marginTop: 50 }}
          >
            Calculation type
          </Text>
        </View>
        <View style={styles.numberInput}>
          {/* <TextInput 
                    // autoFocus={true}
                    placeholder='Interest calculation type' 
                    placeholderTextColor="#79868F"
                    onChangeText={newText => setDescription(newText)} 
                    style={styles.loginTextInput}/> */}
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Simple interest" value="SI" />
            <Picker.Item label="Compound interest" value="CI" />
            {/* <Picker.Item label="JavaScript" value="js" /> */}
          </Picker>
        </View>
        <View style={{ marginTop: 30 }}>
          <PrimaryButton onPress={validation}>Create</PrimaryButton>
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
    flex: 1
  },
});

export default TransferScreen;
