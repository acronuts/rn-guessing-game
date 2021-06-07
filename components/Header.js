import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import colors from "../constants/colors";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: Platform.OS === 'ios' ? 'white' : colors.primary,
    // borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    // borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerAndroid: {
    backgroundColor: colors.primary,
    borderBottomColor: "transparent",
  },
  headerTitle: {
    color: Platform.OS === "ios" ? colors.primary : "white",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});

export default Header;
