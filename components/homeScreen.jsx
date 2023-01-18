import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HomeScreen = () =>{
    const clear = async () =>{
        try{
            await AsyncStorage.removeItem('@viewdOnboarding')
        } catch (err) {
            console.log('err' , err)
        }
    }
    return(
        
        <View style={styles.container}>
            <Text>
                home screen
            </Text>
            <TouchableOpacity onPress={clear}>
                <Text>
                    clear
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  