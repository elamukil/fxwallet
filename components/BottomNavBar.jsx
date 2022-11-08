import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import HomeIcon from "./icons/navBar/HomeIcon";
import SendIcon from "./icons/navBar/SendIcon";
import PayIcon from "./icons/navBar/PayIcon";
import History from "./icons/navBar/HistoryIcon";
import ProfileIcon from "./icons/navBar/ProfileIcon";

function BottomNavBar(props) {
  return (
    <View style={styles.navBarWrap}>
      <View style={styles.navBarItem}>
        <HomeIcon />
        <Text style={styles.navBarItemTextHighLight}>Home</Text>
      </View>
      <View style={styles.navBarItem}>
        <SendIcon />
        <Text style={styles.navBarItemText}>Send</Text>
      </View>
      <View style={styles.navBarItem}>
        <PayIcon />
        <Text style={styles.navBarItemText}>Pay</Text>
      </View>
      <View style={styles.navBarItem}>
        <History />
        <Text style={styles.navBarItemText}>History</Text>
      </View>
      <View style={styles.navBarItem}>
        <ProfileIcon />
        <Text style={styles.navBarItemText}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarWrap: {
    // width: "100vw",
    height: 80,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#00111E",
    alignItems: "center",
    justifyContent: "center",
  },
  navBarItem: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  navBarItemTextHighLight: {
    color: "#60D675",
    fontSize: 14,
  },
  navBarItemText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default BottomNavBar;
