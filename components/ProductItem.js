import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Children } from "react/cjs/react.production.min";
import COLORS from "../constants/colors";

const ProductItem = ({ title, imageUrl, price, onSelect, children}) =>{
    return(
        <View style={styles.mainCont}>

            <TouchableOpacity onPress={onSelect} activeOpacity={0.9}>

                <View style={styles.imgCont}>
                    <Image source={{uri: imageUrl}} style={styles.imgStyle} />
                </View>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={{textAlign: 'center'}}>${price}</Text>
            </TouchableOpacity>

            <View style={styles.btnCont}>

                {children}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        height: 300,
        margin: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden'
    },
    imgCont: {
        marginBottom: 10
    },
    imgStyle :{
        width: '100%',
        height: 200,
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btnCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    
});

export default ProductItem;