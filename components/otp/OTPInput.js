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
 * Last Modified: November 17th 2022, 7:10:21 am                               *
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
import React, { useRef, useState, useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Alert,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import PrimaryButton from "../../components/ui/PrimaryButton";
import BackArrow from '../../components/icons/BackArrow'
import axios from "axios";

const OTPInput = ({ route, navigation }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isStart, setIsStart] = useState(true);
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
    if (isStart) pin1Ref.current.focus();
    else refs.current && refs.current.focus();
  };
  setTimeout(onFocusHandler, 100);
  useEffect(() => {
    onFocusHandler();
  }, []);
  console.log(route.params.phoneNumber);
  console.log("amount", route.params.amount);
  const pinNumber = Number(pin1 + pin2 + pin3 + pin4);
  console.log("pin", pin1 + pin2 + pin3 + pin4);
  console.log("we are here", route.params.onPage || "undefined");
  console.log(route.params.onPage);

  const isPinEnteredCompletly = () => {
    if (
      pin1 !== null &&
      pin1 !== "" &&
      pin2 !== null &&
      pin2 !== "" &&
      pin3 !== null &&
      pin3 !== "" &&
      pin4 !== null &&
      pin4 !== ""
    )
      return true;
    return false;
  };
  const previousRoute = route.params.onPage;
  console.log(previousRoute);
  // function back(){
  //     if(previousRoute === 'transfer'){
  //         navigation.navigate('transfer',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})
  //     }
  // }
  const backAction = () => {
    
    // console.log(prevRoute);
    if (previousRoute === "transfer") {
      clearInput1();
      clearInput2();
      clearInput3();
      clearInput4();
      navigation.navigate("transfer", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    } else if (previousRoute === "recharge") {
      clearInput1();
      clearInput2();
      clearInput3();
      clearInput4();
      navigation.navigate("recharge", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    } else if (previousRoute === "termdeposit") {
      clearInput1();
      clearInput2();
      clearInput3();
      clearInput4();
      navigation.navigate("termdeposit", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    } else if (previousRoute === "cashout2") {
      clearInput1();
      clearInput2();
      clearInput3();
      clearInput4();
      navigation.navigate("cashout2", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    } else {
      console.log("loginotp");
      navigation.navigate("login", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [route.params.onPage]);
  // useEffect(() => {
  //   onFocusHandler();
  // }, []);

  // const onFocusHandler = () => {
  //   pin1Ref.current.focus();
  // }
  // setTimeout(onFocusHandler,100)
  // useEffect(() => {
  //       onFocusHandler();
  // }, []);

  function goBackFromArrow(){
    
    if (previousRoute === "transfer") {
      clearInput1();
      clearInput2();
      clearInput3();
      clearInput4();
      navigation.navigate('transfer',{ phoneNumber: route.params.phoneNumber,
        pin: pinNumber});
    } else if (previousRoute === "recharge") {
      clearInput1();
      clearInput2();
      clearInput3();
      clearInput4();
      navigation.navigate("recharge", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    } else if (previousRoute === "termdeposit") {
      clearInput1();
      clearInput2();
      clearInput3();
      clearInput4();
      navigation.navigate("termdeposit", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    } else if (previousRoute === "cashout2") {
      clearInput1();
      clearInput2();
      clearInput3();
      clearInput4();
      navigation.navigate("cashout2", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    } else {
      console.log("loginotp");
      navigation.navigate("login", {
        phoneNumber: route.params.phoneNumber,
        pin: pinNumber,
        countryCode: route.params.countryCode,
      });
    }
  }

  async function login() {
    console.log("Hi");
    let verifyRequest = {
      phoneNumber: route.params.phoneNumber,
      PIN: Number(pin1 + pin2 + pin3 + pin4),
    };
    console.log(verifyRequest.phoneNumber);
    console.log(route.params.pin);

    if (route.params.onPage === "transfer") {
      let requestedPhoneNumber = 0
      if(route.params.toPhoneNumber){
        requestedPhoneNumber = route.params.toPhoneNumber
      }else if(route.params.contactPerson){
        requestedPhoneNumber = route.params.contactPerson
      }
      let verifyRequest = {
        requestType: "TRANSFER",
        fromAccounts: [
          {
            phoneNumber: route.params.phoneNumber,
            amount: Number(route.params.amount),
          },
        ],
        toAccounts: [
          {
            phoneNumber: requestedPhoneNumber,
            amount: Number(route.params.amount),
          },
        ],
        description: route.params.description,
        PIN: pinNumber,
      };
      console.log(typeof pinNumber);
      console.log(verifyRequest);
      setIsLoaded(false);
      axios
        .post(
          "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/transfer",
          verifyRequest
        )
        .then((res) => {
          setIsLoaded(true);
          console.log("hello", res.data);
          Alert.alert("Transfer Successful", "Click Proceed to Continue", [
            {
              text: "Proceed",
              onPress: () =>
                navigation.navigate("home", {
                  phoneNumber: route.params.phoneNumber,
                  pin: pinNumber,
                  countryCode: route.params.countryCode,
                }),
            },
          ]);
        })
        .catch((err) => {
          setIsLoaded(true);
          console.log(err);
          Alert.alert(err.response.data.data, "Click Proceed to Try Again", [
            {
              text: "Proceed",
              onPress: () =>
                navigation.navigate("transfer", {
                  phoneNumber: route.params.phoneNumber,
                  pin: pinNumber,
                  countryCode: route.params.countryCode,
                }),
            },
          ]);
        });
    } else if (route.params.onPage === "termdeposit") {
      console.log("tedphno", route.params.phoneNumber);
      console.log("tedphno", route.params.tenor);
      console.log("tedphno", route.params.principalAmount);
      console.log("tedphno", route.params.calculationType);
      console.log("routename", route.params.onPage);
      let verifyRequest = {
        phoneNumber: route.params.phoneNumber,
        tenor: Number(route.params.tenor),
        principalAmount: Number(route.params.principalAmount),
        calculationType: route.params.calculationType,
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
          let verifyRequest = {
            requestType: "TD",
            fromAccounts: [
              {
                phoneNumber: route.params.phoneNumber,
                amount: Number(route.params.principalAmount),
              },
            ],
            toAccounts: [
              {
                phoneNumber: res.data.data,
                amount: Number(route.params.principalAmount),
              },
            ],
            PIN: pinNumber,
          };
          console.log(typeof pinNumber);
          console.log(verifyRequest);
          setIsLoaded(false);
          axios
            .post(
              "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/transfer",
              verifyRequest
            )
            .then((res) => {
              setIsLoaded(true);
              console.log("hello", res.data);
              Alert.alert(
                "Term Deposit Account created successfully",
                "Click Proceed to Continue",
                [
                  {
                    text: "Proceed",
                    onPress: () =>
                      navigation.navigate("home", {
                        phoneNumber: route.params.phoneNumber,
                        pin: pinNumber,
                        countryCode: route.params.countryCode,
                      }),
                  },
                ]
              );
            })
            .catch((err) => {
              setIsLoaded(true);
              console.log(err);
              Alert.alert(
                "Account creation Unuccessful",
                "Check your pin or go back",
                [
                  {
                    text: "Go Back",
                    onPress: () =>
                      navigation.navigate("termdeposit", {
                        phoneNumber: route.params.phoneNumber,
                        pin: pinNumber,
                        countryCode: route.params.countryCode,
                      }),
                  },
                  { text: "Try Again" },
                ]
              );
            });
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(
            "Account creation Unuccessful",
            "Click Proceed to Try Again",
            [
              {
                text: "Proceed",
                onPress: () =>
                  navigation.navigate("termdeposit", {
                    phoneNumber: route.params.phoneNumber,
                    pin: pinNumber,
                    countryCode: route.params.countryCode,
                  }),
              },
            ]
          );
        });
    } else if (route.params.onPage === "cashout2") {
      let verifyRequest = {
        requestType: "CASHOUT",
        fromAccounts: [
          {
            phoneNumber: route.params.phoneNumber,
            amount: Number(route.params.amount),
          },
        ],
        PIN: pinNumber,
      };
      axios
        .post(
          "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/transfer",
          verifyRequest
        )
        .then((res) => {
          console.log("hello", res);
          Alert.alert("Cash Out Successful", "Click OK to Continue", [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("home", {
                  phoneNumber: route.params.phoneNumber,
                  pin: pinNumber,
                  countryCode: route.params.countryCode,
                }),
            },
          ]);
        })
        .catch((err) => {
          console.log("erro response", err.response.data);
          console.log("verifyRequest", verifyRequest);
          Alert.alert(err.response.data.data, "Try again", [
            {
              text: "Try again",
            },
          ]);
        });
    } else if (route.params.onPage === "recharge") {
      let verifyRequest = {
        requestType: "TELCO",
        fromAccounts: [
          {
            phoneNumber: route.params.phoneNumber,
            amount: Number(route.params.amount),
          },
        ],
        PIN: pinNumber,
      };
      axios
        .post(
          "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/transfer",
          verifyRequest
        )
        .then((res) => {
          console.log("hello", res);
          Alert.alert("Recharge Successful", "Click OK to Continue", [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("home", {
                  phoneNumber: route.params.phoneNumber,
                  pin: pinNumber,
                  countryCode: route.params.countryCode,
                }),
            },
          ]);
        })
        .catch((err) => {
          console.log("erro response", err.response.data);
          console.log("verifyRequest", verifyRequest);
          if (err.response.data.data === "Wrong PIN") {
            Alert.alert(err.response.data.data, "Try again", [
              {
                text: "Try again",
              },
            ]);
          } else {
            Alert.alert(err.response.data.data, "Try again", [
              {
                text: "Try again",
                onPress: () =>
                  navigation.navigate("recharge", {
                    phoneNumber: route.params.phoneNumber,
                    pin: pinNumber,
                    countryCode: route.params.countryCode,
                  }),
              },
            ]);
          }
        });
    } else {
      let verifyRequest1 = {
        phoneNumber: route.params.phoneNumber,
        PIN: pinNumber,
      };
      console.log(verifyRequest1);
      setIsLoaded(false);
      axios
        .post(
          "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/validate/pin",
          verifyRequest1
        )
        .then((res) => {
          setIsLoaded(true);
          console.log("hello", res.data);
          navigation.navigate("home", {
            phoneNumber: route.params.phoneNumber,
            pin: pinNumber,
            countryCode: route.params.countryCode,
          });
        })
        .catch((err) => {
          setIsLoaded(true);
          console.log(err);
          Alert.alert("Incorrect Pin", "Click Proceed to Try Again", [
            { text: "Proceed" },
          ]);
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

  const getLoader = () => {
    if (isLoaded == false) {
      console.log(
        "The respective api is called and the data is Loading in OTPInput"
      );
      return (
        <View>
          <ActivityIndicator
            height="100%"
            width="100%"
            size="large"
            color="grey"
          ></ActivityIndicator>
        </View>
      );
    }
  };

  return (
    <View>
      <View style={styles.otpContainer}>
      <View style={{ paddingTop: 6, paddingRight: 10, paddingLeft: 10}}>
            <BackArrow onPress={goBackFromArrow} />
          </View>
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
          secureTextEntry={true}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key == "Backspace") {
              if (pin1 !== null && pin1 !== "") {
                setPin1("");
                pin1Ref.current.focus();
              } else {
                pin1Ref.current.focus();
              }
            } else if (nativeEvent.key >= 0 && nativeEvent.key <= 9) {
              if (pin1 == null || pin1 == "") {
                setPin1(nativeEvent.key);
                setIsStart(false);
                pin1Ref.current.focus();
              } else if (pin2 == null || pin2 == "") {
                setPin2(nativeEvent.key);
                pin2Ref.current.focus();
              }
            }
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
          secureTextEntry={true}
          maxLength={1}
          caretHidden={true}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key == "Backspace") {
              if (pin2 !== null && pin2 !== "") {
                setPin2("");
                pin2Ref.current.focus();
              } else {
                setPin1("");
                pin1Ref.current.focus();
              }
            } else if (nativeEvent.key >= 0 && nativeEvent.key <= 9) {
              if (pin2 == null || pin2 == "") {
                setPin2(nativeEvent.key);
                pin2Ref.current.focus();
              } else if (pin3 == null || pin3 == "") {
                setPin3(nativeEvent.key);
                pin3Ref.current.focus();
              }
            }
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
          secureTextEntry={true}
          maxLength={1}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key == "Backspace") {
              if (pin3 !== null && pin3 !== "") {
                setPin3("");
                pin3Ref.current.focus();
              } else {
                setPin2("");
                pin2Ref.current.focus();
              }
            } else if (nativeEvent.key >= 0 && nativeEvent.key <= 9) {
              if (pin3 == null || pin3 == "") {
                setPin3(nativeEvent.key);
                pin3Ref.current.focus();
              } else if (pin4 == null || pin4 == "") {
                setPin4(nativeEvent.key);
                pin4Ref.current.focus();
              }
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
          secureTextEntry={true}
          maxLength={1}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key == "Backspace") {
              if (pin4 !== null && pin4 !== "") {
                setPin4("");
                pin4Ref.current.focus();
              } else {
                setPin3("");
                pin3Ref.current.focus();
              }
            } else if (nativeEvent.key >= 0 && nativeEvent.key <= 9) {
              if (pin4 == null || pin4 == "") {
                setPin4(nativeEvent.key);
                pin4Ref.current.focus();
              }
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
      <View
        // style={styles.loginButton}
        style={[styles.loginButton, {opacity:isPinEnteredCompletly() ? 1: 0.56}]}
        pointerEvents={!isPinEnteredCompletly() ? "none" : "auto"}
      >
        <PrimaryButton
          onPress={() => {
            login();
            clearInput1();
            clearInput2();
            clearInput3();
            clearInput4();
            setIsStart(true);
          }}
        >
          Verify
        </PrimaryButton>
      </View>
      {getLoader()}
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
