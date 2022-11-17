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
 * File: \screens\RechargeScreens\ContactScreen.js                             *
 * Project: kbxwallet                                                          *
 * Created Date: Wednesday, November 16th 2022, 4:51:09 pm                     *
 * Author: Tamil Elamukil <tamil@kbxdigital.com>                               *
 * -----                                                                       *
 * Last Modified: November 17th 2022, 4:34:30 pm                               *
 * Modified By: Hari Prasad
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import axios from "axios";
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  // width,
  ScrollView,
  Image,
  Dimensions,
  BackHandler,
  ImageBackground
} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import BackArrow from "../../components/icons/BackArrow";
const { width, height } = Dimensions.get("window");
const ContactScreen = ({ navigation, route }) => {
  if (route.name === "contacts") {
    const backAction = () => {
      navigation.navigate("transfer", {
        phoneNumber: route.params.phoneNumber,
      });
      return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, ["contacts"]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.transactionHeader}>
        <View style={{ paddingTop: 6, paddingRight: 10, paddingLeft: 10 }}>
          <BackArrow onPress={() => navigation.goBack(null)} />
        </View>
        <Text style={styles.recentText}>Select Contact</Text>
      </View>
      <ScrollView overScrollMode="never" persistentScrollbar={true}>
        {route.params.contacts.map((value, index) => {
          let render = <Pressable style={styles.headerWrap} key={index}
          onPress={() => {
            navigation.navigate("transfer", {
              selectedContact: value.pk,
              selectedName: value.accountHolderName,
              phoneNumber: route.params.phoneNumber,
            });
          }}
        >
          <View style={styles.transactionItemLeft}>
            <View style={styles.transactionItemProfile}>
              {value.profileurl?<Image style={styles.image}
                source={{uri:value.profileurl}}
              ></Image>:<Image style={styles.image} source={require('../../assets/images/user.png')}/>}
              
              {/* <ImageBackground style={styles.imgBackgroud}
                source={value.profileurl}
                resizeMode='cover'
              ></ImageBackground> */}
              {/* <Image source={require('../../assets/images/profile.png')}/> */}
            </View>
            <View style={styles.namePhoneNumberContainer}>
              <Text style={styles.transactionItemName} key={index}>
                {value.accountHolderName}
              </Text>
              <Text style={styles.transactionItemId} key={value.pk}>
                {value.pk}
              </Text>
            </View>
          </View>
        </Pressable>
          return (route.params.phoneNumber === value.pk) ? "" : render
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textColor: "#fff",
    // backgroundColor: "#011627",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 16,
  },
  transactionItemLeft: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
  },
  transactionItemProfile: {
    marginRight: 10,
    padding: 8,
    height: 40,
    width: 40
  },
  namePhoneNumberContainer: {
    marginTop: 5.3,
  },
  transactionItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
  },
  transactionItemId: {
    fontSize: 10,
    marginBottom: 5,
    color: "#888888",
  },
  recentText: {
    color: "#0092A0",
    fontSize: 16,
    fontWeight: "bold",
    // marginLeft: 110,
    textAlign: "center",
    // marginBottom: 20,
    padding: 6
  },
  transactionHeader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10
  },
  headerWrap: {
    width: width,
    // backgroundColor:"red"
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
},
image: {
  flex: 1,
  width: 25,
  height: 30,
  resizeMode: 'contain',
  borderRadius: 50
}

});

export default ContactScreen;
