import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import colors from "../constants/colors";
import CartItem from "./CartItem";

const OrderItem = ({totalAmount, readableDate, items, btnTitle}) =>{

    const [showDetails, setShowDetails] = useState(false);

    return(
        <View style={styles.orderDetail}> 
            <View style={styles.summary}>
                <Text>{totalAmount.toFixed(2)}$</Text>
                <Text>{readableDate}</Text>
            </View>
            <TouchableOpacity style={styles.placeOrdBtn} onPress={()=>{
                setShowDetails(prevDetail => !prevDetail)
            }}>
                <Text style={styles.placeordTxt}>{showDetails? 'Hide Details' : 'Show Details'}</Text>
            </TouchableOpacity>
            {showDetails && <View style={styles.itemsStyle}>
                    {items.map( item => <CartItem
                            key={item.prodId}
                            quantity={item.quantity}
                            prodTitle={item.prodTitle}
                            prodPrice={item.prodPrice}
                            sum={item.sum}
                        />
                    )}
                </View>  
            }
        </View>
    )
}

const styles = StyleSheet.create({
    orderDetail: {
        padding: 15,
        margin: 15,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 5,
    },
    summary: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 15
    },
    placeOrdBtn: {
        backgroundColor: Platform.OS === 'android' ? colors.blue : 'transparent',
        padding: 15,
        alignItems: 'center',
        width: '40%',
        borderRadius: 5,
        alignSelf: 'center'
    },
    placeordTxt: {
        color: Platform.OS === 'android' ? 'white' : colors.blue,
    },
    itemsStyle: {
        paddingHorizontal: 30
    }
})

export default OrderItem;