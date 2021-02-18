import React from 'react';
import { StyleSheet, View } from "react-native";

const Card = ({children, style}) =>{
    return(
        <View style={{...styles.cardStyle, style}}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 5,
    }
});

export default Card;