import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HomeScreen } from "./components/homeScreen";
import { Onboarding } from "./components/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewdOnboarding, setViewdOnboarding] = useState(false);

  const chekOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewdOnboarding");
      if (value !== null) {
        setViewdOnboarding(true);
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chekOnboarding()
  },[])
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : viewdOnboarding ? (
        <HomeScreen />
      ) : (
        <Onboarding />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
});
