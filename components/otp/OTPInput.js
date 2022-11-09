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
 * File: \components\otp\OTPInput.js                                           *
 * Project: kbxwallet                                                          *
 * Created Date: Sunday, November 6th 2022, 1:21:41 am                         *
 * Author: Tamil Elamukil <tamil@kbxdigital.com>                               *
 * -----                                                                       *
 * Last Modified: November 9th 2022, 10:14:17 pm                               *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { TextInput, View, StyleSheet, Text, Alert } from "react-native";
import PrimaryButton from "../../components/ui/PrimaryButton";
// import { login } from "../api/Api";
import HomeScreen from "../../screens/HomeScreen";
import axios from "axios";

// import {
//     getHash,
//     startOtpListener,
//     useOtpVerify,
//   } from 'react-native-otp-verify';

const OTPInput = ({ route, navigation }) => {
  // const { hash, otp, message, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 4});
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [pin1, setPin1] = useState(null);
  const [pin2, setPin2] = useState(null);
  const [pin3, setPin3] = useState(null);
  const [pin4, setPin4] = useState(null);
  const [otps, setOtps] = useState(Array(4));

  const refs = useRef(null);
  const onFocusHandler = () => {
    refs.current && refs.current.focus();
  };
  console.log(route.params.phoneNumber);
  console.log('amount',route.params.amount)
  const pinNumber = Number(pin1 + pin2 + pin3 + pin4)
  console.log("pin", pin1 + pin2 + pin3 + pin4);
  console.log('we are here',route.params.onPage || 'undefined')
  
  async function login() {
    console.log("Hi");
    let verifyRequest = {
      phoneNumber: `+91` + route.params.phoneNumber,
      PIN: Number(pin1 + pin2 + pin3 + pin4),
    };
    console.log(verifyRequest.phoneNumber);
    console.log(route.params.pin)

    axios
      .post(
        "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/validate/pin",
        verifyRequest
      )
      .then((res) => {
        console.log("hello", res);
        if(route.params.onPage ==='transfer'){
            let verifyRequest = {
                requestType:"TRANSFER",
                fromAccounts:[{phoneNumber:`+91`+route.params.phoneNumber, amount:Number(route.params.amount)}],  
                toAccounts:[{phoneNumber:route.params.toPhoneNumber,amount:Number(route.params.amount)}],
                PIN: pinNumber
              };
              console.log(typeof(pinNumber));
              console.log(verifyRequest)
              axios
                .post(
                  "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/transfer",
                  verifyRequest
                )
                .then((res) => {
                  console.log("hello", res);
                  Alert.alert("Transfer Successful");
                })
                .catch((err) => {
                  console.log(err);
                  Alert.alert("Something went wrong");
                });
        }else{
            navigation.navigate("home", { phoneNumber: route.params.phoneNumber, pin: pinNumber});
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong");
      });
  }

  // useEffect(() => {
  // getHash().then(hash => {
  //     // use this hash in the message.
  // }).catch(console.log);

  // startOtpListener(message => {
  //     // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
  //     const otp = /(\d{4})/g.exec(message)[1];
  //     setOtps(otp);
  // });
  // return () => removeListener();
  // }, []);

  return (
    <View>
      <View style={styles.otpContainer}>
        <Text style={styles.otpText}>PIN</Text>
        <Text style={{ color: "white", padding: 5, marginLeft: 10 }}>
          Enter your 4 digit PIN<Text style={{ color: "green" }}></Text>
        </Text>
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <TextInput
          maxLength={1}
          ref={pin1Ref}
          autoFocus={true}
          keyboardType="number-pad"
        //   caretHidden={true}
          onChangeText={(pin1) => {
            setPin1(pin1);
            if (pin1 !== null) {
              pin2Ref.current.focus();
            }
          }}
          style={{
            backgroundColor: "#fff",
            // borderBottomColor: "#79868F",
            marginTop: 90,
            fontWeight: "600",
            alignSelf: "center",
            padding: 0,
            fontSize: 20,
            height: 50,
            width: "15%",
            borderRadius: 5,
            borderColor: "grey",
            textAlign: "center",
            color: "#333",
            borderStyle: "solid",
            borderColor: "#0092A0",
            borderWidth: 0.5,
          }}
        />
        <TextInput
          ref={pin2Ref}
          keyboardType="number-pad"
          maxLength={1}
        //   caretHidden={true}
          onChangeText={(pin2) => {
            setPin2(pin2);
            if (pin2 !== null) {
              pin3Ref.current.focus();
            }
          }}
          style={{
            backgroundColor: "#fff",
            marginTop: 90,
            fontWeight: "600",
            alignSelf: "center",
            padding: 0,
            fontSize: 20,
            height: 50,
            width: "15%",
            borderRadius: 5,
            borderColor: "grey",
            textAlign: "center",
            color: "#333",
            borderStyle: "solid",
            borderColor: "#0092A0",
            borderWidth: 0.5,
          }}
        />
        <TextInput
          ref={pin3Ref}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(pin3) => {
            setPin3(pin3);
            if (pin3 !== null) {
              pin4Ref.current.focus();
            }
          }}
          style={{
            backgroundColor: "#fff",
            marginTop: 90,
            fontWeight: "600",
            alignSelf: "center",
            padding: 0,
            fontSize: 20,
            height: 50,
            width: "15%",
            borderRadius: 5,
            borderColor: "grey",
            textAlign: "center",
            color: "#333",
            borderStyle: "solid",
            borderColor: "#0092A0",
            borderWidth: 0.5,
          }}
        />
        <TextInput
          ref={pin4Ref}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(pin4) => {setPin4(pin4)
            if (pin4 !== null) {
                pin1Ref.current.focus();
              }
          }
        }
          style={{
            backgroundColor: "#fff",
            marginTop: 90,
            fontWeight: "600",
            alignSelf: "center",
            padding: 0,
            fontSize: 20,
            height: 50,
            width: "15%",
            borderRadius: 5,
            borderColor: "grey",
            textAlign: "center",
            color: "#333",
            borderStyle: "solid",
            borderColor: "#0092A0",
            borderWidth: 0.5,
          }}
        />
      </View>
      {/* <View style={{position: 'absolute', marginTop: 295, marginLeft: 280}}><Text style={{color: '#79868F'}}>Resend Otp</Text></View> */}
      <View style={styles.loginButton}>
        <PrimaryButton onPress={login}>Verify</PrimaryButton>
      </View>
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  otpContainer: {
    marginTop: 40,
  },
  otpText: {
    textDecorationStyle: "Gilroy-Bold",
    fontSize: 28,
    lineHeight: 100,
    color: "#0092A0",
    marginLeft: 25,
  },
  loginButton: {
    marginTop: 300,
    marginLeft: 15,
  },
});
