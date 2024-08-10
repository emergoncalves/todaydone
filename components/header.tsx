import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

function Header() {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={styles.textLogo}>TODAY</Text>
        <Text style={styles.textLogoHighlight}>DONE</Text>
      </View>
      <View>
        <Ionicons name="log-out" size={32} color={Colors.dark.tint} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  textLogo: {
    color: Colors.dark.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  textLogoHighlight: {
    color: Colors.dark.tint,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Header;
