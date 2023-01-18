import React from "react";
import { View, Text, Image, Dimensions, StyleSheet, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

export const OnboardingItem = ({ item }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
    maxWidth: "70%",
    textAlign: "center",
    marginHorizontal: "15%",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    marginTop : Platform.OS ==='android' ? 10 : 40
  },
});
