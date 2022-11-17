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
import DownArrow from "../components/icons/DownArrow";
import CashIn from "../components/icons/CashIn";
import CashOut from "../components/icons/CashOut";
import Send from "../components/icons/SendIcon";
import PayBills from "../components/icons/PayBills";
import Wallet from "../components/icons/WalletBlack";

function TransactionItem({ props }) {
  // console.log("transaction", props);
  const transactionProfile = () => {
    if (props.optionalFields.hasOwnProperty("transferPurpose")) {
      if (props.optionalFields.transferPurpose.transactionPurpose == "TOP-UP") {
        return <PayBills />;
      } else if (
        props.optionalFields.transferPurpose.transactionPurpose == "P2P"
      ) {
        return <Send />;
      } else if (
        props.optionalFields.transferPurpose.transactionPurpose == "CASH-OUT"
      ) {
        return <CashOut />;
      } else if (
        props.optionalFields.transferPurpose.transactionPurpose == "CASH-IN"
      ) {
        return <CashIn />;
      } else {
        return <Wallet />;
      }
    }
    else {
      if (props.optionalFields.transactionPurpose == "TOP-UP") {
        return <PayBills />;
      } else if (
        props.optionalFields.transactionPurpose == "P2P"
      ) {
        return <Send />;
      } else if (
        props.optionalFields.transactionPurpose == "CASH-OUT"
      ) {
        return <CashOut />;
      } else if (
        props.optionalFields.transactionPurpose == "CASH-IN"
      ) {
        return <CashIn />;
      } else {
        return <Wallet />;
      }
    }
  };
  const fromAndTo = () => {
    if (props.optionalFields.hasOwnProperty("transactionDetails")) {
      if(props.optionalFields.transactionDetails.hasOwnProperty("DEBIT")) {
        let response = (props.transactionType === "CREDIT") ? props.optionalFields.transactionDetails.DEBIT : props.optionalFields.transactionDetails.CREDIT
        let splitted = response.split(" ")
        splitted.splice(1, 0, ":")
        console.log("splitted", splitted)
        return splitted.join(" ")
      }
      return props.transactionDescription
    }
    else {
      return props.transactionDescription
    }
  }
  return (
    <View style={styles.transactionItem}>
      {/* {...props} */}
      <View style={styles.transactionItemLeft}>
        <View style={styles.transactionItemProfile}>
          {/* <Image source={require("../assets/images/profile.png")}></Image> */}
          {transactionProfile()}
        </View>
        <View>
          <Text style={styles.transactionItemName}>
            {fromAndTo().length > 30
              ? fromAndTo().slice(0, 30) + "..."
              : fromAndTo()}
            {/* {props.transactionDescription.length > 15
              ? props.transactionDescription.slice(0, 16) + "..."
              : props.transactionDescription} */}
              {/* {(props.transactionType === "CREDIT") ? props.optionalFields.transactionDetails.DEBIT : props.optionalFields.transactionDetails.CREDIT} */}
          </Text>
          <Text style={styles.transactionItemId}>
            TXN Ref:{" "}
            {props.transactionId.length > 20
              ? props.transactionId.slice(0, 6)
              : props.transactionId}
          </Text>
        </View>
      </View>
      <View style={styles.transactionItemRight}>
        <Text style={styles.transactionAmount}>
          {props.transactionType === "DEBIT" ? (
            <Text style={styles.debit}>-{props.transactionAmount}</Text>
          ) : (
            <Text style={styles.credit}>+{props.transactionAmount}</Text>
          )}
        </Text>
        {/* {(props.transactionType === "DEBIT") ? <Text style={styles.debit}>Dr</Text> : <Text style={styles.credit}>Cr</Text>} */}
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
    padding: 8,
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
    marginRight: 8,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 4,
  },
  credit: {
    // color: "#60D675",
    color: "#46B900",
    padding: 4,
    fontWeight: "bold",
    marginRight: 4,
  },
  debit: {
    color: "#D95959",
    padding: 4,
    fontWeight: "bold",
    marginRight: 4,
  },
});

export default TransactionItem;
