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
 * Last Modified: November 5th 2022, 4:40:19 pm                                *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton';

export default function LoginScreen() {
  
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.loginText}>Login</Text>
            <View style={styles.numberInput}>
                <Text style = {{color: 'white'}}>Mobile Number</Text>
                <TextInput maxLength={10} 
                    keyboardType="number-pad" 
                    placeholder='Enter mobile Number' 
                    placeholderTextColor="#79868F" 
                    style={styles.loginTextInput}/>
            </View>
            <View style={styles.numberInput}>
                <Text style = {styles.passwordText}>Password</Text>
                <TextInput  
                    placeholder='Enter Password' 
                    placeholderTextColor="#79868F" 
                    style={styles.loginTextInput}/>
            </View>
            <View style={styles.loginButton}>
                <PrimaryButton>Login</PrimaryButton>
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginTop: 85,
        padding: 16,
        backgroundColor: '#011627'
    },
    numberInput: {
        height: 50,
        width: 350,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 2,
        color: '#ddb52f',
        marginVertical: 8,
        fontWeight: 'bold',
        marginTop: 90,
        marginBottom: -10,
    },
    passwordText: {
        color: 'white',
        marginBottom: 0,
    },
    loginText: {
        textDecorationStyle: 'Gilroy-Bold',
        fontSize: 32,
        lineHeight: 48,
        color: '#60D675',
    },
    loginTextInput: {
        // textAlign: 'center',
    },
    loginButton: {
        marginTop: 30
    }
  });
