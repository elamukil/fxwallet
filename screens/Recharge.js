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
 * File: \screens\Recharge.js                                                  *
 * Project: kbxwallet                                                          *
 * Created Date: Thursday, November 10th 2022, 12:17:34 pm                     *
 * Author: Hari Prasad <hari@kbxdigital.com>                                   *
 * -----                                                                       *
 * Last Modified: November 17th 2022, 12:05:32 pm                              *
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
  Alert,
  useWindowDimensions,
} from "react-native";
import * as React from "react";
import BackArrow from "../components/icons/BackArrow";
import QuestionMark from "../components/icons/QuestionMark";
import EditIcon from "../components/icons/EditIcon";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import PagerView from "react-native-pager-view";
import TopUpPlan from "./RechargeScreens/TopUpPlan";

export default ({ navigation, route }) => {
  const FirstRoute = () => (
    // <View style={{ height: "50%", backgroundColor: "#ff4081" }} />
    <TopUpPlan navigation={navigation} route={route} />
  );

  const SecondRoute = () => (
    // <View style={{ height: "50%", backgroundColor: "#673ab7" }} />
    <TopUpPlan navigation={navigation} route={route} />
  );
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? "#0092A0" : "#333",
            margin: 8,
            fontWeight: "700",
          }}
        >
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: "#0092A0" }}
      style={{ backgroundColor: "white", color: "#333" }}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "TOP UP" },
    { key: "second", title: "DATA PLAN" },
  ]);

  const backAction = () => {
    navigation.navigate("home", {
      phoneNumber: route.params.phoneNumber,
      pin: route.params.pin,
    });
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <BackArrow onPress={() => {navigation.navigate('home',{phoneNumber: route.params.phoneNumber})}} />
        <View>
          <Text style={styles.headerTitle}>Recharge</Text>
        </View>
        <QuestionMark />
      </View>
      <View style={styles.secondaryHeader}>
        <View style={styles.secondaryHeaderLeft}>
          <Image source={require("../assets/images/rechargeProfile.png")} />
          <View style={styles.secondaryHeaderLeftWrap}>
            <Text style={styles.secondaryHeaderMobile}>{route.params.phoneNumber}</Text>
            {/* <Text style={styles.secondaryHeaderMobileOperator}>
              Airtel | Tamil Nadu
            </Text> */}
          </View>
        </View>
        {/* <EditIcon /> */}
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryHeader: {
    padding: 16,
    backgroundColor: "#0092A0",
    display: "flex",
    flexDirection: "row",
  },
  secondaryHeaderLeft: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  secondaryHeaderMobile: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },
  secondaryHeaderLeftWrap: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 8,
  },
  secondaryHeaderMobileOperator: {
    color: "#80C8CF",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000"
  },
});
