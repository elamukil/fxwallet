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
 * File: \screens\LoginScreen.js                                               *
 * Project: kbxwallet                                                          *
 * Created Date: Thursday, November 3rd 2022, 1:57:12 pm                       *
 * Author: Tamil Elamukil <tamil@kbxdigital.com>                               *
 * -----                                                                       *
 * Last Modified: November 15th 2022, 12:03:50 pm                              *
 * Modified By: Hari Prasad                                                    *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */
{
  /* <AntDesign name="eyeo" size={24} color="#CBDAE7" /> */
} //will use for eye in password
import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
} from "react-native";
import CheckBox from "expo-checkbox";
import { login } from "../components/api/Api";
import PrimaryButton from "../components/ui/PrimaryButton";
import OTPInput from "../components/otp/OTPInput";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Walletimg from "../assets/walletimg";
import { AntDesign } from "@expo/vector-icons";
import { CountryPicker } from "react-native-country-codes-picker";

export default function LoginScreen({ navigation, code }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  // console.log(phoneNumber)

  const isMobNoEnteredCompletly = () => {
    if (phoneNumber.length >= 10 || phoneNumber.length <= 12)
      return(true);
    return(false);
  }

  return (
    <View style={styles.inputContainer}>
      {/* <View style={{position: 'absolute', marginLeft: 330, marginBottom: 80}}>
                <Walletimg/>
            </View> */}
      <View style={styles.fixedScreen}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View>
        <Text style={{ color: "#0092A0", position: "absolute", marginTop: 80 }}>
          Mobile Number
        </Text>
      </View>
      <View style={styles.numberInput}>
        <View style={styles.coutryCode}>
          <Pressable onPress={() => setShow(true)}>
            <Text style={styles.coutryCodeText}>{countryCode}</Text>
          </Pressable>
        </View>
        <TextInput
          maxLength={12}
          autoFocus={true}
          keyboardType="number-pad"
          placeholder="Enter mobile Number"
          placeholderTextColor="#79868F"
          onChangeText={(newText) => setPhoneNumber(newText)}
          style={styles.loginTextInput}
        />
      </View>
      <View  style={[styles.loginButton, {opacity:isMobNoEnteredCompletly() ? 1: 0.5}]}>
        <PrimaryButton
          onPress={() =>
            navigation.navigate("otp", { phoneNumber: phoneNumber , countryCode: countryCode})
          }
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.2 : 1,
            },
            styles.button,
          ]}
          // style={[styles.loginButton, {opacity:isMobNoEnteredCompletly() ? 1: 0.5}]}
        >
          Login
        </PrimaryButton>
      </View>
      <View
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <Text style={{ color: "black" }}>Didn't have account?</Text>
        <Pressable onPress={() => navigation.navigate("signup")}>
          <Text style={{ color: "#0092A0" }}> Sign Up</Text>
        </Pressable>
        {/* <Pressable onPress={() => navigation.navigate("country")}>
          <Text style={{ color: "#0092A0" }}> Sign Up</Text>
        </Pressable> */}
      </View>
      <CountryPicker
        initialState={"+91"}
        show={show}
        onBackdropPress={() => setShow(false)}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginTop: 85,
    marginBottom: 30,
    padding: 16,
    backgroundColor: "#fff",
  },
  numberInput: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontSize: 32,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    color: "#lightgrey",
    marginVertical: 8,
    fontWeight: "normal",
    marginTop: 100,
    marginBottom: -10,
  },
  numberInput1: {
    // position: 'absolute',
    height: 50,
    width: 350,
    fontSize: 32,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    color: "#lightgrey",
    marginVertical: 8,
    fontWeight: "normal",
    marginTop: 90,
    marginBottom: -10,
  },
  coutryCode: {
    // borderBottomColor: "grey",
    // borderBottomWidth: 1,
    marginTop: 25,
    marginRight: 16,
    marginLeft: 16,
    width: "auto",
  },
  coutryCodeText: {
    color: "#333",
  },
  passwordText: {
    color: "white",
    marginTop: 0,
  },
  loginText: {
    textDecorationStyle: "Manrope",
    fontSize: 32,
    lineHeight: 48,
    color: "#0092A0",
    marginLeft: 15,
  },
  loginTextInput: {
    color: "#333",
    marginTop: 20,
  },
  loginButton: {
    marginTop: 30,
  },
  alternateLogin: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    color: "white",
    overflow: "hidden",
  },
  fixedScreen: {
    position: "absolute",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: -70,
  },
});
