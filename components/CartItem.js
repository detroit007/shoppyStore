import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
const CartItem = ({quantity, prodTitle, prodPrice, disabled, onRemove}) =>{
    return (
        <View style={styles.cartItem}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{quantity}</Text>
                <Text style={{color: COLORS.primary}}> {prodTitle}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>${prodPrice.toFixed(2)} </Text>
                {disabled && <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={onRemove}>
                    <Icon name='trash' size={18} color='red' />
                </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    btn: {
        padding: 10
    }
})

export default CartItem;