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
 * Last Modified: November 12th 2022, 11:08:38 pm                              *
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
import {Picker} from '@react-native-picker/picker';

const TransferScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState(0);
  const [tenor, setTenor] = useState(0);
  const [selectedValue, setSelectedValue] = useState("SI");

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

  async function transfer() {
    console.log("Hi");
    let verifyRequest = {
      phoneNumber: route.params.phoneNumber,
      tenor: 10,
      principalAmount: amount,
      calculationType: "SI",
    };
    // console.log(verifyRequest.phoneNumber);

    axios
      .post(
        "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/td",
        verifyRequest
      )
      .then((res) => {
        console.log("hello", res);
        navigation.navigate("home", { phoneNumber: route.params.phoneNumber });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong");
      });
  }

  return (
    <View style={styles.TransferContainer}>
      <View style={styles.fixedScreen}>
        <Text style={styles.loginText}>Term Deposit</Text>
      </View>
      <View>
        <Text style={{ color: "#0092A0", position: "absolute", marginTop: 80 }}>
          Tenor
        </Text>
      </View>
      <View style={styles.numberInput}>
        <TextInput
          maxLength={10}
          autoFocus={true}
          keyboardType="number-pad"
          placeholder="Enter tenor"
          placeholderTextColor="#79868F"
          onChangeText={(newText) => setTenor(newText)}
          style={styles.loginTextInput}
        />
      </View>
      <View>
        <Text style={{ color: "#0092A0", position: "absolute", marginTop: 80 }}>
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
        <Text style={{ color: "#0092A0", position: "absolute", marginTop: 80 }}>
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
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Simple interest" value="SI" />
          {/* <Picker.Item label="JavaScript" value="js" /> */}
        </Picker>
      </View>
      <View style={{ marginTop: 30 }}>
        <PrimaryButton
          onPress={() =>
            navigation.navigate("otp", {
              phoneNumber: route.params.phoneNumber,
              principalAmount: amount,
              tenor: tenor,
              calculationType: selectedValue,
              onPage: route.name,
            })
          }
        >
          Create
        </PrimaryButton>
      </View>
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
