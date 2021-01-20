import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../../components/OrderItem";
import colors from "../../../constants/colors";

const OrderScreen = () =>{
    const orders = useSelector(state=> state.order.orders );

    return(
        <View style={styles.orderCont}>
            <FlatList
                data={orders}
                renderItem={
                    ({item})=>(
                        <OrderItem
                            totalAmount={item.totalAmount}
                            readableDate={item.readableDate}
                            items={item.items}
                        />
                    )
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    orderCont: {
        flex: 1
    },
    orderDetail: {
        padding: 15,
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
    }
})

export default OrderScreen;