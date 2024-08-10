import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Colors } from "@/constants/Colors";

interface ListItemProps {
  text: string;
  done: boolean;
  id: string;
}

const ListItem = ({ text, done, id }: ListItemProps) => {
  async function updateTask() {
    const docRef = doc(db, "tasks", id);
    await updateDoc(docRef, {
      done: !done,
    });
  }

  async function deleteTask() {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  }
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={updateTask}>
        {done ? (
          <Ionicons
            name="radio-button-on"
            size={24}
            color={Colors.dark.success}
          />
        ) : (
          <Ionicons
            name="radio-button-off"
            size={24}
            color={Colors.dark.tint}
          />
        )}
      </TouchableOpacity>
      <Text style={done ? styles.statusDone : styles.statusDoing}>{text}</Text>

      {/* <Ionicons name="pencil-sharp" size={24} color="#ECD9BB" /> */}
      <TouchableOpacity onPress={deleteTask}>
        <Ionicons name="trash-outline" size={24} color={Colors.dark.tint} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderColor: Colors.dark.tint,
    gap: 12,
    borderWidth: 1,
    marginBottom: 18,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: Colors.dark.secondaryBackground,
  },
  statusDone: {
    color: Colors.dark.muted,
    fontWeight: "bold",
    opacity: 0.5,
    fontSize: 18,
    flex: 1,
    textDecorationLine: "line-through",
  },
  statusDoing: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "semibold",
    flex: 1,
  },
});

export default ListItem;
