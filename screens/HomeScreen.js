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
 * File: \screens\HomeScreen.js                                                *
 * Project: kbxwallet                                                          *
 * Created Date: Wednesday, November 9th 2022, 10:31:44 am                     *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified: November 12th 2022, 10:25:27 pm                              *
 * Modified By: Hari Prasad                                                    *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  Pressable,
  BackHandler,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Notification from "../components/icons/NotificationButton";
import Blob from "../components/BackgroundBlob";
import Wallet from "../components/icons/Wallet";
import Topup from "../components/icons/TopupIcon";
import Send from "../components/icons/SendIcon";
import Pay from "../components/icons/PayIcon";
import History from "../components/icons/HistoryIcon";
import UpArrow from "../components/icons/UpArrow";
import TransactionItem from "../components/TransactionItem";
import BottomNavBar from "../components/BottomNavBar";
import Kbx from "../components/icons/KBXLogo";
import Profile from "../components/icons/Profile";
import PlusIcon from "../components/icons/PlusIcon";
import { LinearGradient } from "expo-linear-gradient";
import HistoryW from "../components/icons/HistoryIconW";
import PayBills from "../components/icons/PayBills";
import CashIn from "../components/icons/CashIn"
import CashOut from "../components/icons/CashOut"
import ViewSlider from 'react-native-view-slider'
import TdBalance from "./HomeComponents/TdBalance";
import TdBalance2 from "./HomeComponents/TdBalance2";
const { width, height } = Dimensions.get('window');
import axios from "axios";
import Skeleton from "../components/Skeleton";


export default function HomeScreen({ route, navigation }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadSkeleton, setLoadSkeleton] = useState(true)
  const [transaction, setTransaction] = useState([]);
  const [balance, setBalance] = useState([]);
  const [tdBalance, setTd] = useState([]);
  if(route.name==='home') {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
  
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
  
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
  }

//   const setTimePassed = () => {
//       setIsLoaded(false);
//  }

  useEffect(() => {
    function getTransaction() {   
      let fullFromDate = new Date()
      fullFromDate.setDate(fullFromDate.getDate()-15)
      let fullToDate = new Date()
      let fromDate = fullFromDate.getFullYear()+'-'+((fullFromDate.getMonth()+1<9)?'0'+fullFromDate.getMonth()+1:fullFromDate.getMonth()+1)+'-'+((fullFromDate.getDate()<9)?'0'+fullFromDate.getDate():fullFromDate.getDate())
      let toDate = fullToDate.getFullYear()+'-'+((fullToDate.getMonth()+1<9)?'0'+fullToDate.getMonth()+1:fullToDate.getMonth()+1)+'-'+((fullToDate.getDate()<9)?'0'+fullToDate.getDate():fullToDate.getDate())
      axios.get(`https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/account/${route.params.phoneNumber}/transaction?fromDate=${fromDate}&toDate=${toDate}`)
        .then((response) => {
          setIsLoaded(true);
          setTransaction(response.data.data);
          axios.get(`https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/${route.params.phoneNumber}/balance`)
          .then((response) => {
            setLoadSkeleton(false)
            setBalance(response.data.data);
          })
          .catch((error) => {});
        })
        .catch((error) => {});
        axios.get(`https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/${route.params.phoneNumber}`)
          .then((response) => {
            setTd(response.data.TDDetails);
            console.log("td", tdBalance)
          })
          .catch((error) => {});
    }
    getTransaction();
  }, []);
  const getTransactionDisplComp = () => {
    if (loadSkeleton == true) {
      const cardWidth = "90%";
      // const skeWidth = cardWidth - 32;
      console.log("The transactions are loading")
      return (
        <View style={styles.container}>
          {/* <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" /> */}
          <View  width = {320} style={styles.card}>
            <Skeleton height={50} width = {"40%"} style = {{borderRadius: 8, marginTop: 16}}></Skeleton>
            {/* <Skeleton height={40} width = {40} style = {{borderRadius: 20}}></Skeleton> */}
            <Skeleton height={30} width = {"100%"} style = {{borderRadius: 8, marginTop: 16}}></Skeleton>
            <Skeleton height={30} width = {"100%"} style = {{borderRadius: 8, marginTop: 16}}></Skeleton>
            <Skeleton height={30} width = {"100%"} style = {{borderRadius: 8, marginTop: 16}}></Skeleton>
            <Skeleton height={30} width = {"100%"} style = {{borderRadius: 8, marginTop: 16}}></Skeleton>
            <Skeleton height={30} width = {"100%"} style = {{borderRadius: 8, marginTop: 16}}></Skeleton>
            {/* <Skeleton height={40} width = {"80%"} style = {{borderRadius: 8, marginTop: 16}}></Skeleton> */}
          </View>
        </View>
      );
    }
    return(
        <View style={styles.transactionWrap}>
            <View style={styles.transactionHeader}>
              <View style={styles.transactionHeaderLeft}>
                <Text style={styles.recentText}>Recent</Text>
                <Text style={styles.transactionText}>Transaction</Text>
              </View>
              <Text style={styles.transactionSeeAllBtn}>See all</Text>
            </View>
              <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
                {transaction.map((v, i) => {
                  return <TransactionItem key={i} props={v} />;
                })}
              </ScrollView>
        </View>
    )
  } 
  if (isLoaded == false) {
    console.log("The respective api is called and the sata is Loading")
    return(
      <ActivityIndicator height= "100%"
                         width= '100%'
                         top = "950%"
                        size="large" color="black"></ActivityIndicator>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <View style={styles.profilePicture}>
          <Profile />
        </View>
        <View style={styles.titleWrap}>
          <Kbx />
        </View>
        <View>
          <View style={styles.notification}>
            <Notification />
          </View>
        </View>
      </View>
      <View style={styles.mainBody}>
      <ViewSlider
      slideCount = {2+tdBalance.length}
      dots = {true}
      dotActiveColor = '#0092A0'
      dotInactiveColor = 'gray'
      dotsContainerStyle={styles.dotContainer}
      autoSlide = {false}
      // slideInterval = {1000}
      renderSlides = {
        <>
        <View style={styles.carousalView}>
        <LinearGradient
          colors={["#0092A0", "#095B6D"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.balanceContainer}
        >
          <View style={styles.balanceTitleWrap}>
            <Wallet />
            <Text style={styles.balanceTitle}>Wallet Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>{balance} MMK</Text>
          <View style={styles.addWrap}>
            <View style={styles.addMoneyBtn}>
              <PlusIcon />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </View>
            <View style={styles.historyBtn}>
              <HistoryW />
            </View>
          </View>
        </LinearGradient>
        </View>
        {(tdBalance.length === 0) ? '' : <TdBalance2 props={tdBalance} />}
        <TdBalance phoneNumber={route.params.phoneNumber} navigation={navigation} pin={route.params.pin}/>
        
        </>
      }
        />
        <View style={styles.serviceWrap}>
          <View style={styles.service}>
            <View style={styles.serviceIcon}>
              <PayBills onPress={() => navigation.navigate('recharge', {phoneNumber:route.params.phoneNumber, pin: route.params.pin})}/>
            </View>
            <Text style={styles.serviceName}>Pay Bills</Text>
          </View>
          <View style={styles.service}>
            <View style={styles.serviceIcon}>
              <Send onPress={() => navigation.navigate('transfer',{phoneNumber:route.params.phoneNumber, pin: route.params.pin})} />
            </View>
            <Text style={styles.serviceName}>Transfers</Text>
          </View>
          <View style={styles.service}>
            <View style={styles.serviceIcon}>
              <CashIn onPress={() => navigation.navigate('cashin',{phoneNumber:route.params.phoneNumber, pin: route.params.pin})} />
            </View>
            <Text style={styles.serviceName}>Cash In</Text>
          </View>
          <View style={styles.serviceLast}>
            <View style={styles.serviceIcon}>
              <CashOut onPress={() => navigation.navigate('cashout',{phoneNumber:route.params.phoneNumber, pin: route.params.pin})} />
            </View>
            <Text style={styles.serviceName}>Cash Out</Text>
          </View>
        </View>
      </View>
      {getTransactionDisplComp()}
      {/* <BottomNavBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textColor: "#fff",
    // backgroundColor: "#011627",
    backgroundColor: "#fff",
    alignItems: "center",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // padding: 16,
  },
  headerWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  profilePicture: {
    paddingLeft: 8,
  },
  logoText: {
    color: "#60D675",
    fontSize: 24,
    marginRight: 8,
    fontWeight: "bold",
  },
  titleWrap: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  textColor: {
    color: "#222222",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    paddingTop: 2,
  },
  mainBody: {
    padding: 16,
    width: "100%",
    backgroundColor: "#DDDDDD",
  },
  balanceContainer: {
    height: 150,
    // backgroundColor: "#095B6D"
    width: "90%",
    marginRight: 12,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowOffset: {width: 2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,
  },
  balanceTitleWrap: {
    display: "flex",
    flexDirection: "row",
  },
  balanceTitle: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },
  addMoneyBtn: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    borderRadius: 8,
  },
  addMoneyText: {
    color: "#0092A0",
    fontSize: 14,
    paddingLeft: 4,
    fontWeight: "bold",
  },
  notification: {
    borderRadius: 8,
    padding: 8,
  },
  balanceAmount: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  serviceWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  service: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // width: 76,
    // height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  serviceLast: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  serviceName: {
    marginTop: 4,
    fontSize: 14,
    color: "#011627",
    fontWeight: "500"
  },
  transactionWrap: {
    width: "100%",
    height: "55%",
    alignSelf: "stretch",
    backgroundColor: "#fff",
    padding: 16,
  },
  transactionHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#CBDAE7",
    borderBottomWidth: 1,
  },
  transactionHeaderLeft: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginBottom: 12,
  },
  recentText: {
    color: "#0092A0",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  transactionText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionSeeAllBtn: {
    color: "#333333",
    fontSize: 14,
  },
  transactionHeaderDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "#CBDAE7",
  },
  transactionItem: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 12,
    borderBottomColor: "#CBDAE7",
    borderBottomWidth: 2,
    // paddingBottom: 8,
  },
  transactionItemLeft: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
  },
  transactionItemProfile: {
    marginRight: 8,
  },
  transactionItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  transactionItemId: {
    fontSize: 10,
    color: "#79868F",
  },
  transactionItemRight: {
    display: "flex",
    flexDirection: "row",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
  addWrap: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
  },
  historyBtn: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginLeft: 8,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 0.5,
  },
  carousalView: {
    width: width,
    paddingBottom: 10,
    // alignItems: "center"
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    // bottom: 30
    marginTop: 160,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  card: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    top: '2%',
    height: '80%',
    borderRadius: 15,
  }
});
