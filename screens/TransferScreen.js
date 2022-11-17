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
 * Last Modified: November 17th 2022, 4:38:32 pm                               *
 * Modified By: Hari Prasad
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
  Pressable,
  NativeAppEventEmitter,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CountryPicker } from "react-native-country-codes-picker";
import BackArrow from "../components/icons/BackArrow";
import ContactIcon from "../components/icons/ContactIcon"
import axios from 'axios'

const TransferScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [toPhoneNumber, setToPhoneNumber] = useState(0);
  const [countryCode, setCountryCode] = useState(route.params.countryCode);
  const [show, setShow] = useState(false);

  let contactPerson = route.params.selectedContact
  let contactName = route.params.selectedName
  // console.log(countryCode)

  const amountIsValid = !isNaN(amount) && amount > 0;
  const descriptionIsValid = description.trim().length > 0;
  const toPhoneNumberIsValid = toPhoneNumber.length == 10;


  const isAllFieldsEnteredCompletly = () => {
    if ((amount > 0 && toPhoneNumber.length >= 10 && toPhoneNumber.length <= 12)|| (contactPerson && amount > 0))
      return true;
    return false;
  };
  const validation = () => {
    if (!toPhoneNumberIsValid && !contactPerson) {
      Alert.alert("Please enter a valid phone number");
      return false;
    } else if (!amountIsValid) {
      Alert.alert("Please enter a valid amount");
      return false;
    } else {
      navigation.navigate("otp", {
        phoneNumber: route.params.phoneNumber,
        amount: amount,
        toPhoneNumber: toPhoneNumber,
        contactPerson: contactPerson,
        description: description,
        onPage: route.name,
        countryCode: route.params.countryCode,
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

  function showContactList(){
    axios
      .get(
        "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts"
      )
      .then((res) => {
          console.log(res.data.data)
          navigation.navigate('contacts',{contacts: res.data.data, phoneNumber: route.params.phoneNumber})
      })
      .catch((err) => {
        // console.log("erro response", err.response.data);
        // console.log("verifyRequest", verifyRequest);
        Alert.alert('Uh oh!, We cannot process your request at this time', "Try again", [
          {
            text: "Try again",
          },

        ]);
      });
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.TransferContainer}>
        <View style={styles.fixedScreen}>
          <View style={{ paddingTop: 6, paddingRight: 6 }}>
            <BackArrow onPress={() => {navigation.navigate('home',{phoneNumber: route.params.phoneNumber, pin: route.params.pin})}} />
          </View>
          <Text style={styles.loginText}>Transfer</Text>
        </View>
        <View>
          <Text
            style={{ color: "#0092A0", position: "absolute", marginTop: 50 }}
          >
            Mobile Number
          </Text>
        </View>
        <View style={styles.numberInput}>
          <TextInput
            maxLength={10}
            autoFocus={true}
            keyboardType="number-pad"
            placeholder="Enter Mobile Number"
            placeholderTextColor="#79868F"
            onChangeText={(phno) => setToPhoneNumber(phno)}
            // onKeyPress={({ nativeEvent }) => {
            //   if (nativeEvent.key == "Backspace") {
            //     contactPerson.length-1
            //   }
            // }}
            style={styles.loginTextInput}
            value={contactPerson}
          />
          <Pressable style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1.0 }
              ]} onPress={() => {
                showContactList();
              }}>
            <ContactIcon />
          </Pressable>
        </View>
        <Text style={{color: '#FFCF00', marginTop: 8, marginBottom: -8}}>{contactName}</Text>
        {/* <View style={styles.numberInput}>
          <View style={styles.coutryCode}>
            <Pressable onPress={() => setShow(true)}>
              <Text style={styles.coutryCodeText}>{countryCode}</Text>
            </Pressable>
          </View>
          <TextInput
            maxLength={10}
            autoFocus={true}
            keyboardType="number-pad"
            placeholder="Enter mobile Number"
            placeholderTextColor="#79868F"
            onChangeText={(newText) => setToPhoneNumber(newText)}
            style={styles.loginTextInput}
          />
        </View> */}
        <View>
          <Text
            style={{ color: "#0092A0", position: "absolute", marginTop: 50 }}
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
            style={{ color: "#0092A0", position: "absolute", marginTop: 50 }}
          >
            Description
          </Text>
        </View>
        <View style={styles.numberInput}>
          <TextInput
            // autoFocus={true}
            placeholder="Add note"
            placeholderTextColor="#79868F"
            onChangeText={(newText) => setDescription(newText)}
            style={styles.loginTextInput}
          />
        </View>
        <View
          style={[
            { marginTop: 50 },
            { height: 50, opacity: isAllFieldsEnteredCompletly() ? 1 : 0.5 },
          ]}
          pointerEvents={!isAllFieldsEnteredCompletly() ? "none" : "auto"}
        >
          <PrimaryButton
            disable={isAllFieldsEnteredCompletly()}
            params={isAllFieldsEnteredCompletly()}
            onPress={() => {
              validation();
            }}
          >
            Transfer
          </PrimaryButton>
        </View>
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
  // numberInput: {
  //   height: 50,
  //   // width: 350,
  //   fontSize: 32,
  //   borderBottomColor: "grey",
  //   borderBottomWidth: 1,
  //   color: "#lightgrey",
  //   marginVertical: 8,
  //   fontWeight: "normal",
  //   marginTop: 100,
  //   marginBottom: -10,
  // },
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
});

export default TransferScreen;
