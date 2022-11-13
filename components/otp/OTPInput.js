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
 * Last Modified: November 12th 2022, 11:09:47 pm                              *
 * Modified By: Hari Prasad                                                    *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Alert,
  BackHandler,
} from "react-native";
import PrimaryButton from "../../components/ui/PrimaryButton";
import HomeScreen from "../../screens/HomeScreen";
import axios from "axios";

const OTPInput = ({ route, navigation }) => {
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
  console.log("amount", route.params.amount);
  const pinNumber = Number(pin1 + pin2 + pin3 + pin4);
  console.log("pin", pin1 + pin2 + pin3 + pin4);
  console.log("we are here", route.params.onPage || "undefined");
  console.log(route.params.onPage);

  
    const previousRoute = route.params.onPage
    console.log(previousRoute)
    // function back(){
    //     if(previousRoute === 'transfer'){
    //         navigation.navigate('transfer',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})
    //     }
    // }
    const backAction = () => {
        const routes = navigation.getState()?.routes;
        const prevRoute = routes[routes.length - 2];
        console.log(prevRoute)
        if(previousRoute === 'transfer'){
            navigation.navigate('transfer',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})
        }
        else if(previousRoute === 'cashout2'){
            navigation.navigate('cashout2',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})
        }
        else{
            console.log('loginotp')
            navigation.navigate('login',{phoneNumber: route.params.phoneNumber, pin: pinNumber})
        }
      return true;
    };
  
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
  
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [route.params.onPage]);

  async function login() {
    console.log("Hi");
    let verifyRequest = {
      phoneNumber: route.params.phoneNumber,
      PIN: Number(pin1 + pin2 + pin3 + pin4),
    };
    console.log(verifyRequest.phoneNumber);
    console.log(route.params.pin);
        if(route.params.onPage ==='transfer'){
            let verifyRequest = {
                requestType:"TRANSFER",
                fromAccounts:[{phoneNumber:route.params.phoneNumber, amount:Number(route.params.amount)}],  
                toAccounts:[{phoneNumber:route.params.toPhoneNumber,amount:Number(route.params.amount)}],
                description: route.params.description,
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
                  console.log("hello", res.data);
                  Alert.alert("Transfer Successful", 'Click Proceed to Continue', [{text: 'Proceed', onPress:() => navigation.navigate('home',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})}]);
                  
                })
                .catch((err) => {
                  console.log(err);
                  Alert.alert("Transfer Unuccessful", 'Click Proceed to Try Again', [{text: 'Proceed', onPress:() => navigation.navigate('transfer',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})}]);
                });
                
        }
        else if (route.params.onPage === "termdeposit") {
          let verifyRequest = {
            phoneNumber: route.params.phoneNumber,
            tenor: route.params.tenor,
            principalAmount: route.params.principalAmount,
            calculationType: route.params.calculationType,
            PIN: pinNumber,
          };
          console.log(typeof pinNumber);
          console.log(verifyRequest);
          axios
            .post(
              "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/td",
              verifyRequest
            )
            .then((res) => {
              console.log("hello", res.data);
              Alert.alert("Deposit created successfully", "Click Proceed to Continue", [
                {
                  text: "Proceed",
                  onPress: () =>
                    navigation.navigate("home", {
                      phoneNumber: route.params.phoneNumber,
                      pin: pinNumber,
                    }),
                },
              ]);
            })
            .catch((err) => {
              console.log(err);
              Alert.alert("Deposit creation Unuccessful", "Click Proceed to Try Again", [
                {
                  text: "Proceed",
                  onPress: () =>
                    navigation.navigate("termdeposit", {
                      phoneNumber: route.params.phoneNumber,
                      pin: pinNumber,
                    }),
                },
              ]);
            });
        }
        else if(route.params.onPage === 'cashout2'){
            let verifyRequest = {
                requestType:"CASHOUT",
                fromAccounts:[{"phoneNumber":route.params.phoneNumber, "amount":route.params.amount}],
                description: route.params.description,
                PIN: route.params.pin
              };
              axios
                    .post(
                      "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/transfer",
                      verifyRequest
                    )
                    .then((res) => {
                      console.log("hello", res);
                      Alert.alert("Cash Out Successful", 'Click OK to Continue', [{text: 'OK', onPress:() => navigation.navigate('home',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})}])
                    })
                    .catch((err) => {
                      console.log(err);
                      Alert.alert("Incorrect Pin", 'Please Try Again', [{text: 'OK'}])
                    });
        }
        else {
            let verifyRequest1 = {
                phoneNumber: route.params.phoneNumber, 
                PIN: pinNumber
              };
              console.log(verifyRequest1)
            axios
                .post(
                  "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/validate/pin",
                  verifyRequest1
                )
                .then((res) => {
                  console.log("hello", res.data);
                  navigation.navigate("home", { phoneNumber: route.params.phoneNumber, pin: pinNumber});
                  
                })
                .catch((err) => {
                  console.log(err);
                  Alert.alert("Incorrect Pin", 'Click Proceed to Try Again', [{text: 'Proceed'}]);
                });
        }
  }
  const clearInput1 = React.useCallback(() => setPin1(""), []);
  const clearInput2 = React.useCallback(() => setPin2(""), []);
  const clearInput3 = React.useCallback(() => setPin3(""), []);
  const clearInput4 = React.useCallback(() => setPin4(""), []);
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
            if (pin1 == "") pin1Ref.current.focus();
            if (pin1 !== null && pin1 !== "") {
              pin2Ref.current.focus();
            }
          }}
          onKeyPress={() => {
            console.log("pin1 is : ", pin1);
            if (pin1 == "") pin1Ref.current.focus();
            if (pin1 !== null && pin1 !== "") pin2Ref.current.focus();
          }}
          value={pin1}
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
            if (pin2 == "") pin1Ref.current.focus();
            if (pin2 !== null && pin2 !== "") {
              pin3Ref.current.focus();
            }
          }}
          onKeyPress={() => {
            if (pin2 == "" || pin2 == null) pin1Ref.current.focus();
            if (pin2 !== null && pin2 !== "") pin3Ref.current.focus();
          }}
          value={pin2}
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
            if (pin3 == "") pin2Ref.current.focus();
            if (pin3 !== null && pin3 !== "") {
              pin4Ref.current.focus();
            }
          }}
          onKeyPress={() => {
            if (pin3 == "" || pin3 == null) pin2Ref.current.focus();
            if (pin3 !== null && pin3 !== "") {
              pin4Ref.current.focus();
            }
          }}
          value={pin3}
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
          onChangeText={(pin4) => {
            setPin4(pin4);
            if (pin4 == "") pin3Ref.current.focus();
            if (pin4 !== null && pin4 !== "") {
              pin1Ref.current.focus();
            }
          }}
          onKeyPress={() => {
            if (pin4 == "" || pin4 == null) pin3Ref.current.focus();
            if (pin4 !== null && pin4 !== "") {
              pin1Ref.current.focus();
            }
          }}
          value={pin4}
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
        <PrimaryButton
          onPress={() => {
            login();
            clearInput1();
            clearInput2();
            clearInput3();
            clearInput4();
          }}
        >
          Verify
        </PrimaryButton>
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
    marginTop: 100,
    padding: 16,
    // marginLeft: 15,
  },
});
