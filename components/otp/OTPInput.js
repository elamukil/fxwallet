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
 * Last Modified: November 8th 2022, 4:08:31 pm                                *
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
import React, {useRef,useState} from "react";
import { TextInput, View, StyleSheet, Text } from 'react-native';
import PrimaryButton from 'C:/Users/Nithin/KBXPay_Frontend/kbxWallet/components/ui/PrimaryButton.js'
// import { login } from "../api/Api";
import HomeScreen from 'C:/Users/Nithin/KBXPay_Frontend/kbxWallet/screens/HomeScreen'
import axios from "axios"

// import {
//     getHash,
//     startOtpListener,
//     useOtpVerify,
//   } from 'react-native-otp-verify';




const OTPInput = ({ route, navigation }) => {

    // const { hash, otp, message, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 4});
    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)
    const [ isAuthenticating, setIsAuthenticating] = useState(false);
    const [pin1, setPin1] = useState(null)
    const [pin2, setPin2] = useState(null)
    const [pin3, setPin3] = useState(null)
    const [pin4, setPin4] = useState(null)
    const [otps, setOtps] = useState(Array(4))
    
    const refs = useRef(null)
    const onFocusHandler = () => {
        refs.current && refs.current.focus();
       }
    console.log(route.params.phoneNumber)

    async function loginHandler(){
        setIsAuthenticating(true)
        const res = await login(route.params.phoneNumber)
        console.log('hello',res)
        setIsAuthenticating(false)

    }
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
        };
    };
    function login(phoneNumber){
        console.log('Hi')
        let verifyRequest = {
            phoneNumber: '+917777777777'
        }
        // console.log(verifyRequest.phoneNumber)
    
        axios.post("https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/signin/otp", verifyRequest)
        .then((res)=> {
            console.log('hello', res)
            navigation.navigate('home')
        }).catch((err)=>{
            console.log(err)
        })
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
            <Text style={styles.otpText}>OTP</Text>
            <Text style={{color: 'white', padding:5,marginLeft: 10}}>We have sent 4 digit one time password to your mobile number <Text style={{color: 'green'}}> +918248685803</Text></Text>
        </View>
        <View style = {{flex: 0.6, justifyContent: "space-evenly", flexDirection: "row"}}>
            <TextInput 
            maxLength={1}
            ref={pin1Ref}
            autoFocus={true}
            keyboardType="number-pad"
            onChangeText={(pin1)=> {setPin1(pin1)
                if(pin1 !== null){
                    pin2Ref.current.focus()
                }
            }
            }
            style={{backgroundColor: '#1A2D3D',borderBottomColor: '#79868F', marginTop: 90, fontWeight: "600", alignSelf: 'center', padding: 0, fontSize: 20, height: 50, width: "15%", borderRadius: 5, borderColor: "grey",textAlign: 'center', color: 'white'}}/>
            <TextInput 
            ref={pin2Ref}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(pin2)=> {setPin2(pin2)
                if(pin2 !== null){
                    pin3Ref.current.focus()
                }
            }
            }
            style={{backgroundColor: '#1A2D3D', marginTop: 90, fontWeight: "600", alignSelf: 'center', padding: 0, fontSize: 20, height: 50, width: "15%", borderRadius: 5, borderColor: "grey",textAlign: 'center', color: 'white'}}/>
            <TextInput 
            ref={pin3Ref}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(pin3)=> {setPin3(pin3)
                if(pin3 !== null){
                    pin4Ref.current.focus()
                }
            }
            }
            style={{backgroundColor: '#1A2D3D', marginTop: 90, fontWeight: "600", alignSelf: 'center', padding: 0, fontSize: 20, height: 50, width: "15%", borderRadius: 5, borderColor: "grey",textAlign: 'center', color: 'white'}}/>
            <TextInput 
            ref={pin4Ref}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(pin4)=> setPin1(pin4)}
            style={{backgroundColor: '#1A2D3D', marginTop: 90, fontWeight: "600", alignSelf: 'center', padding: 0, fontSize: 20, height: 50, width: "15%", borderRadius: 5, borderColor: "grey",textAlign: 'center', color: 'white'}}/>
        </View>
        <View style={{position: 'absolute', marginTop: 295, marginLeft: 280}}><Text style={{color: '#79868F'}}>Resend Otp</Text></View>
        <View style={styles.loginButton}>
                <PrimaryButton  onPress={login}>Verify</PrimaryButton>
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
        textDecorationStyle: 'Gilroy-Bold',
        fontSize: 28,
        lineHeight: 100,
        color: '#60D675',
        marginLeft: 15
    },
    loginButton: {
        marginTop: 300,
        marginLeft: 15,
    },
  });
