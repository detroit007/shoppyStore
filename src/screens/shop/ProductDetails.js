import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import COLORS from "../../../constants/colors";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/actions/cart";

const ProductDetails = ({route}) =>{
    const { product } = route.params;
    const dispatch = useDispatch();
    return(
        <View style={styles.mainCont}>

            <View style={styles.imgCont}>
                <Image style={styles.imgStyle} source={{uri: product.imageUrl}} />
            </View>

            <View style={styles.details}>

                <TouchableOpacity style={styles.btn} onPress={()=>{dispatch(addToCart(product))}} activeOpacity={0.6}>
                    <Text style={styles.btnText}>Add To Cart</Text>
                </TouchableOpacity>

                <Text style={{fontSize: 18}}>${product.price}</Text>
                <Text style={styles.descText}>{product.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
    },
    imgCont: {
        marginBottom: 20
    },
    imgStyle: {
        width: '100%',
        height: 250
    },
    details: {
        alignItems: 'center',
        paddingHorizontal: 10
    },
    btn: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primary : 'transparent',
        padding: 7,
        marginBottom: 30,
    },
    btnText: {
        color: Platform.OS === 'android' ? 'white' : COLORS.primary
    },
    descText:{ 
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10
    }

})

export default ProductDetails;