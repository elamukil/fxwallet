import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import UpArrow from "../components/icons/UpArrow";

function TransactionItem() {
  return (
    <View style={styles.transactionItem}>
      {/* {...props} */}
      <View style={styles.transactionItemLeft}>
        <View style={styles.transactionItemProfile}>
          <Image source={require("../assets/images/profile.png")}></Image>
        </View>
        <View>
          <Text style={styles.transactionItemName}>Jeevan Raj</Text>
          <Text style={styles.transactionItemId}>Ref: 109873673933</Text>
        </View>
      </View>
      <View style={styles.transactionItemRight}>
        <Text style={styles.transactionAmount}>50,000 MMK</Text>
        <UpArrow />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 12,
    borderBottomColor: "#3B4C5A",
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
});

export default TransactionItem;
