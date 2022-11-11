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
 * File: \App.js                                                               *
 * Project: kbxwallet                                                          *
 * Created Date: Thursday, November 3rd 2022, 12:51:23 pm                      *
 * Author: Tamil Elamukil <tamil@kbxdigital.com>                               *
 * -----
 * Last Modified: November 10th 2022, 7:49:43 pm                               *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUPScreen from './screens/SignUPScreen';
import HomeScreen from './screens/HomeScreen'
import OTPInput from './components/otp/OTPInput';
import TransferScreen from './screens/TransferScreen';
import Walletimg from './assets/walletimg';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CashIn from './screens/CashIn';
import CashIn2 from './screens/CashIn2';
import CashOut from './screens/CashOut';
import CashOut2 from './screens/CashOut2';

const stack = createNativeStackNavigator()

export default function App() {
  
  return (
    
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <NavigationContainer>
        <stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          header: () => null,
          contentStyle: { backgroundColor: '#fff' },
        }}>
          <stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
          <stack.Screen name="otp" component={OTPInput}/>
          <stack.Screen name="signup" component={SignUPScreen} options={{ headerShown: false }}/>
          <stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }}/>
          <stack.Screen name="cashin" component={CashIn} options={{ headerShown: false }}/>
          <stack.Screen name="cashin2" component={CashIn2} options={{ headerShown: false }}/>
          <stack.Screen name="cashout" component={CashOut} options={{ headerShown: false }}/>
          <stack.Screen name="cashout2" component={CashOut2} options={{ headerShown: false }}/>
          <stack.Screen name="transfer" component={TransferScreen} options={{ headerShown: false }}/>
        </stack.Navigator>
      </NavigationContainer>
      </View>
      
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
},

});
