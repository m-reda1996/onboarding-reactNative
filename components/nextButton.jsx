import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

export const NextButton = ({ scrollTo,percentage }) => {
  const size = 128;
  const strokeWidth = 4;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    console.log(percentage)
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;
        if(progressRef.current){
          progressRef.current.setNativeProps({
              strokeDashoffset
          })
        }
    },[percentage]);
    return () => {
        progressAnimation.removeAllListeners()
    }
  },[]);
  return (
    <View style={style.dot}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#ebf5e9"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
          ref={progressRef}
            stroke="#68933f"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity onPress={scrollTo} style={style.button} activeOpacity={0.6}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  dot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#68933f",
    borderRadius: 100,
    padding: 20,
  },
});
