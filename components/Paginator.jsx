import React from "react";
import { View , Text , StyleSheet, Dimensions, Animated  } from "react-native";


export const Paginator = ({date ,scrollX}) => {
    const {width} = Dimensions.get('window')
    return(
        <View style ={{flexDirection :'row' , height : 64}}>
            {date.map(( _ , index ) =>{
                const inputRange = [(index - 1 ) * width , index * width , (index+ 1) * width]

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange : [10 ,20,10],
                    extrapolate : 'clamp'
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange : [0.3 ,1,0.3],
                    extrapolate : 'clamp'
                })
                return <Animated.View style={[style.dot, {width : dotWidth , opacity}]} key= {index} />
            })}
        </View>
    )
}


const style = StyleSheet.create({
    dot : {
        height : 10,
        borderRadius : 5,
        backgroundColor : 'green',
        marginHorizontal : 8,
        marginTop : 30
    }
})