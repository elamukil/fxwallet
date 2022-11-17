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
 * Last Modified: November 17th 2022, 11:33:17 am                              *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import React, {useState, useEffect} from 'react';
import {   View,
    StyleSheet,
    StatusBar,
    Text,
    Image,
    TextInput,
    BackHandler,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    SafeAreaView,
    ScrollView,
    Keyboard,
    Alert, } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios'
import DailogBox from '../components/ui/DailogBox';

const CashIn3 = ({navigation, route, phoneNumber}) => {

    const [amount, setAmount] = useState(0)
    const [agent, setAgent] = useState('')
    // const [toPhoneNumber, setToPhoneNumber] = useState(route.params.phoneNumber)

    const amountIsValid = !isNaN(amount) && amount > 0;
    const agentIsValid = agent.trim(). length > 0;

    
    // const backAction = () => {
    // navigation.navigate('cashin2',{ phoneNumber: route.params.phoneNumber})
    //     return true;
    // };
    
    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", backAction);
    
    //     return () =>
    //     BackHandler.removeEventListener("hardwareBackPress", backAction);
    // }, []);

    const isAllFieldsEnteredCompletly = () => {
        if (amount > 0)
      return(true)
    return(false)
    }

    function requestCashIn() {

        let verifyRequest = {
            
                agentCode: "kbxagent",
                receiverPhoneNumber: phoneNumber,
                amount: Number(amount)
            
          };
          console.log(typeof(pinNumber));
          console.log(verifyRequest)
          axios
            .post(
              "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/cashIn/Request",
              verifyRequest
            )
            .then((res) => {
              console.log("hello", res.data);
              setAgent(res.data.data)
            //   Alert.alert(
            //     "Copy agent code!",
            //     res.data.data,
            //     [
            //        { text: "OK",
            //           onPress: () =>
            //           navigation.navigate("home", {
            //             phoneNumber: route.params.phoneNumber,
            //             pin: route.params.pin,
            //           })
            //        }
            //     ],
            //     { cancelable: false }
            //  );
              
            })
            .catch((err) => {
              console.log(err);
              return
            //   Alert.alert("Enter Correct Info", 'Click Proceed to Try Again', [{text: 'Proceed', onPress:() => navigation.navigate('transfer',{ phoneNumber: route.params.phoneNumber, pin: pinNumber})}]);
            });
    }
    const validation = ()=>{
        if (!amountIsValid) {
            Alert.alert('Please enter a valid amount');
            return false
        }
        else {
            requestCashIn()
        }
    }

    const getAgentComp = () => {
        if (agent !== '') {
         return (
            <View style={{flexDirection:'row'}}>  
                <Text style={{marginLeft: -40, marginTop: 12}}>Requested agent code: </Text>
                <Text style = {{color: '#0092A0', position: 'absolute', marginLeft: 110, marginTop: 12}}> {agent}</Text>
            </View>
         )
         } else {
            return(<View></View>);
         }
    }

return (
    <SafeAreaView style={styles.container1}>
      <KeyboardAwareScrollView>
        <ScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          behavior="padding"
          scrollEnabled={false}
          // contentContainerStyle={styles.container1}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.headerWrap}>
                <Text style={styles.pageTitle}>Cash In</Text>
              </View>
              {/* <Text></Text> */}
              <Text style={styles.agentCodeSelect}>                Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                keyboardType="numeric"
                onChangeText={(amt) => setAmount(amt)}
              />
              {/* <Text style={styles.agentCodeSelect}>                 Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter details of the transaction "
                onChangeText={(txt) => setDescription(txt)}
              /> */}
              <View style={{opacity:isAllFieldsEnteredCompletly() ? 1: 0.5}} pointerEvents={!isAllFieldsEnteredCompletly() ? 'none' : 'auto'}>
                <PrimaryButton onPress={validation}>Request Cash In</PrimaryButton>
              </View>
              {/* <View style={styles.footer}>
                <Text style={styles.footerFaqText}>
                  How to cash out at agent?
                </Text>
              </View> */}
               {getAgentComp()}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    height: "100%",
  },
  agentCodeSelect: {
    marginLeft: -200,
    // color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: '10%'
  },
  agentInput : {
    height: 50,
    // width: 350,
    fontSize: 32,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    color: "#lightgrey",
    // marginVertical: 8,
    fontWeight: "normal",
    margin: 12,
  },
  container: {
    flex: 1,
    textColor: "#fff",
    backgroundColor: "#fff",
    alignItems: "center",
    height: "150%",
    // padding: 16,
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 10,
  },
  headerWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    width: "140%",
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
  },
  pageTitle: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
  },
  optionsContainer: {
    // padding: 16,
    width: "100%",
  },
  optionsTitle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 8,
  },
  optionsDesc: {
    color: "#333",
    fontSize: 16,
    alignItems: "center",
    marginTop: 8,
  },
  footerBtn: {
    padding: 8,
    backgroundColor: "#0092A0",
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    // position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  footerFaqText: {
    color: "#0092A0",
    fontSize: 16,
  },
});

export default CashIn3;
