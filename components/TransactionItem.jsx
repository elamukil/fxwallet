/*
 * Filename: c:\KBX Apps\KBXPay_Frontend\components\TransactionItem.jsx
 * Path: c:\KBX Apps\KBXPay_Frontend
 * Created Date: Wednesday, November 9th 2022, 10:31:44 am
 * Author: Hari Prasad
 * 
 * Copyright (c) 2022 KBX Digital
 */

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import UpArrow from "../components/icons/UpArrow";
import DownArrow from "../components/icons/DownArrow"

function TransactionItem({ props }) {
  // console.log("transaction", props);
  return (
    <View style={styles.transactionItem}>
      {/* {...props} */}
      <View style={styles.transactionItemLeft}>
        <View style={styles.transactionItemProfile}>
          <Image source={require("../assets/images/profile.png")}></Image>
        </View>
        <View>
          <Text style={styles.transactionItemName}>
            {props.transactionDescription}
          </Text>
          <Text style={styles.transactionItemId}>
            ID: {props.transactionId}
          </Text>
        </View>
      </View>
      <View style={styles.transactionItemRight}>
        <Text style={styles.transactionAmount}>
          {props.transactionAmount} MMK
        </Text>
        {(props.transactionType === "DEBIT") ? <Text style={styles.debit}>Dr</Text> : <Text style={styles.credit}>Cr</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 12,
    borderBottomColor: "#CBDAE7",
    borderBottomWidth: 1,
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
    color: "#333333",
  },
  transactionItemId: {
    fontSize: 10,
    color: "#888888",
  },
  transactionItemRight: {
    display: "flex",
    flexDirection: "row",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 4,
  },
  credit: {
    color: "#60D675",
    padding: 4,
    fontWeight: "bold"
  },
  debit: {
    color: "#D95959",
    padding: 4,
    fontWeight: "bold"
  }
});

export default TransactionItem;
