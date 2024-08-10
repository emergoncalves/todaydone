import { Text, View, StyleSheet } from "react-native";
import React, { Component, useEffect, useRef, useState } from "react";
import { db } from "@/config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import LottieView from "lottie-react-native";
import { Colors } from "@/constants/Colors";

export function Counter() {
  const confettiRef = useRef<LottieView>(null);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);

  function triggerConfetti() {
    confettiRef.current?.play(0);
  }

  useEffect(() => {
    if (done >= total) {
      triggerConfetti();
    }
  }, [done, total]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No matching documents.");
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
      const total = tasks.length;
      setTotal(total);
      const done = tasks.filter((task) => task.done).length;
      setDone(done);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title}>Todo Done</Text>
          <Text style={styles.subtite}>keep it up</Text>
        </View>
        <View style={done >= total ? styles.totalDone : styles.totalUndone}>
          <Text style={styles.bigNumber}>
            {done}/{total}
          </Text>
        </View>
      </View>
      <LottieView
        ref={confettiRef}
        source={require("@/assets/images/confetti.json")}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtite: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 4,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: 24,
    borderColor: Colors.dark.text,
    borderWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 48,
    borderRadius: 48,
  },
  totalUndone: {
    display: "flex",
    minWidth: 100,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 250,
    backgroundColor: Colors.dark.tint,
  },
  totalDone: {
    display: "flex",
    minWidth: 100,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 250,
    backgroundColor: Colors.dark.success,
  },
  bigNumber: {
    color: "#000",
    fontSize: 38,
    fontWeight: "bold",
  },
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: "none",
  },
});

export default Counter;
