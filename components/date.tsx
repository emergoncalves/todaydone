import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";

const CurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.dark.text }}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
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

export default CurrentDate;
