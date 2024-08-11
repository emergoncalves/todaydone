import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Colors } from "@/constants/Colors";

export function InputTask() {
  const [task, setTask] = useState("");
  async function addTask() {
    const docRef = await addDoc(collection(db, "tasks"), {
      task: task,
      done: false,
    });
    setTask("");
  }
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="What task will you do today?"
        placeholderTextColor={Colors.dark.muted}
        value={task}
        onChangeText={(text) => setTask(text)}
        focusable
        style={styles.input}
      />
      <TouchableOpacity onPress={addTask}>
        <View style={styles.buttonAdd}>
          <Ionicons name="add" size={24} color="#000" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 32,
    padding: 10,
  },
  input: {
    backgroundColor: Colors.dark.secondaryBackground,
    color: Colors.dark.text,
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 24,
  },
  buttonAdd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.tint,
    height: 36,
    width: 36,
    padding: 0,
    fontSize: 24,
    color: "#000",
    borderRadius: 24,
    marginLeft: 10,
  },
});

export default InputTask;
