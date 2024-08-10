import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import React, { Component } from "react";
import Header from "@/components/header";
import { StatusBar } from "expo-status-bar";
import Counter from "@/components/counter";
import InputTask from "@/components/inputTask";
import ListTasks from "@/components/listTasks";
import { Colors } from "@/constants/Colors";
import Date from "@/components/date";

export class HomePage extends Component {
  render() {
    return (
      <SafeAreaView style={this.styles.safeArea}>
        <StatusBar backgroundColor={Colors.dark.background} style="light" />
        <View style={this.styles.container}>
          <Header />
          <Date />
          <Counter />
          <InputTask />
          <ListTasks />
        </View>
      </SafeAreaView>
    );
  }

  styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      marginTop: 20,
      padding: 10,
      backgroundColor: Colors.dark.background,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  });
}

export default HomePage;
