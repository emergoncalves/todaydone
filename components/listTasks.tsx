import { Text, View, StyleSheet, ScrollView, SectionList } from "react-native";
import React, { Component, useEffect, useState } from "react";
import {
  getDocs,
  collection,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import ListItem from "./listItem";
import { db } from "../config/firebaseConfig";

export function ListTasks() {
  const [tasks, setTasks] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        setTasks([]);
        return;
      }
      const tasks = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          task: data.task,
          done: data.done,
        };
      });

      setTasks(tasks);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ width: "100%" }}>
        {tasks.map((task) => (
          <ListItem
            text={task.task}
            done={task.done}
            id={task.id}
            key={task.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 12,
    marginTop: 18,
    padding: 10,
  },
});

export default ListTasks;
