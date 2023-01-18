import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState, useRef } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import { slides } from "../slides";
import { NextButton } from "./nextButton";
import { OnboardingItem } from "./OnboardingItem";
import { Paginator } from "./Paginator";

const color = { primary: "#282534", white: "#fff" };
const { width, height } = Dimensions.get("window");

export function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null)
const viewableItemsChanged = useRef(({viewableItems}) =>{
  setCurrentIndex(viewableItems[0].index)
}).current
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo =  async() => {
    if(currentIndex < slides.length -1){
      sliderRef.current.scrollToIndex({index : currentIndex + 1 })
    } else{
       try{
        await AsyncStorage.setItem("@viewdOnboarding" , 'true')
       } catch(err){
          console.log('err' , err)
       }
    }
  }
  return (
    <View style={[styles.container, { width }]}>
      <View style ={{flex : 3}}>
      <StatusBar backgroundColor={color.white} />
      <FlatList
        pagingEnabled
        data={slides}
        // contentContainerStyle={{ height: height * 0.7 }}
        showsHorizontalScrollIndicator = {false}
        horizontal
        renderItem={({ item }) => <OnboardingItem item={item} />}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig ={viewConfig}
        scrollEventThrottle ={32}
        ref ={sliderRef}
      />
      {/* <Footer /> */}
      </View>
      <Paginator date ={slides}  scrollX ={scrollX}/>
      <NextButton scrollTo = {scrollTo} percentage={(currentIndex + 1) * (100 /slides.length)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
