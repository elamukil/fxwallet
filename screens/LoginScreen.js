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
 * Last Modified: November 10th 2022, 10:24:05 am                              *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */
{/* <AntDesign name="eyeo" size={24} color="#CBDAE7" /> */}//will use for eye in password
import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Text, Pressable} from 'react-native'
import CheckBox from 'expo-checkbox';
import { login } from '../components/api/Api';
import PrimaryButton from '../components/ui/PrimaryButton';
import OTPInput from '../components/otp/OTPInput';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Walletimg from '../assets/walletimg';
import { AntDesign } from '@expo/vector-icons'; 

export default function LoginScreen({ navigation, code }) {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [toggleCheckBox, setToggleCheckBox] = useState(false)


    // console.log(phoneNumber)
    

    return (
        <View style={styles.inputContainer}>
            {/* <View style={{position: 'absolute', marginLeft: 330, marginBottom: 80}}>
                <Walletimg/>
            </View> */}
            <View style={styles.fixedScreen}>
                <Text style={styles.loginText}>Login</Text>
            </View>
            <View>
                    <Text style = {{color: '#0092A0', position: 'absolute', marginTop:80}}>Mobile Number</Text>
            </View>
            <View style={styles.numberInput}>
                <TextInput maxLength={10} 
                    autoFocus={true}
                    keyboardType="number-pad" 
                    placeholder='Enter mobile Number' 
                    placeholderTextColor="#79868F"
                    onChangeText={newText => setPhoneNumber(newText)} 
                    style={styles.loginTextInput}/>
            </View>
            <View style={styles.loginButton}>
                <PrimaryButton onPress={() => navigation.navigate('otp',{phoneNumber: phoneNumber})} style={({ pressed }) => [
                    {
                    opacity: pressed
                        ? 0.2
                        : 1,
                    },
                    styles.button,
                ]}>Login</PrimaryButton>
            </View>
            <View style={{alignItems: 'center', marginTop: 20, flexDirection: 'row',marginLeft: 70}}>
                <Text style={{color: 'black'}}>Didn't have account?</Text>
                <Pressable onPress={() => navigation.navigate('signup')}><Text style={{color: '#0092A0'}}> Sign Up</Text></Pressable>
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginTop: 85,
        marginBottom: 30,
        padding: 16,
        backgroundColor: '#fff'
    },
    numberInput: {
        height: 50,
        width: 350,
        fontSize: 32,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        color: '#lightgrey',
        marginVertical: 8,
        fontWeight: 'normal',
        marginTop: 100,
        marginBottom: -10,
        
    },
    numberInput1: {
        // position: 'absolute',
        height: 50,
        width: 350,
        fontSize: 32,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        color: '#lightgrey',
        marginVertical: 8,
        fontWeight: 'normal',
        marginTop: 90,
        marginBottom: -10,
        
    },
    
    passwordText: {
        color: 'white',
        marginTop: 0,
    },
    loginText: {
        textDecorationStyle: 'Manrope',
        fontSize: 32,
        lineHeight: 48,
        color: '#0092A0',
        marginLeft: 15
    },
    loginTextInput: {
        color: '#333',
        marginTop:20,
    },
    loginButton: {
        marginTop: 30
    },
    alternateLogin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        color: 'white',
        overflow: 'hidden'
    },
    fixedScreen: {
        position: 'absolute',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: -70
    }
  });
