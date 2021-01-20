import React from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../../components/CartItem";
import COLORS from "../../../constants/colors";
import { removeFromCart } from "../../../store/actions/cart";
import { addOrder } from "../../../store/actions/orders";


const CartScreen = () =>{
    const products = useSelector(state =>  state.cart.items);
    const totalAmount = useSelector(state =>  state.cart.totalAmount);
    const dispatch = useDispatch();
    
    let selectedItems = [];
    for (const key in products) {
        selectedItems.push({
            prodId: key,
            prodTitle: products[key].prodTitle,
            prodPrice: products[key].prodPrice,
            quantity: products[key].quantity,
            sum: products[key].sum
        })
    }

    return (
        <View style={styles.screen}>
            <View style={styles.cartItem}>
                <Text>Total: <Text style={{color: COLORS.primary}}>${totalAmount.toFixed(2)}</Text></Text>
                <TouchableOpacity disabled={selectedItems.length > 0 ? false: true} style={styles.btn} activeOpacity={0.6} 
                    onPress={()=>{
                        dispatch(addOrder(selectedItems, totalAmount))
                }}>
                    <Text style={styles.btnText}>Order Now</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={selectedItems.sort((a,b)=> a.prodId > b.prodId ? 1 : -1)}
                renderItem={({item})=>{
                    return(
                        <CartItem
                            quantity={item.quantity}
                            prodTitle={item.prodTitle}
                            prodPrice={item.prodPrice}
                            sum={item.sum}
                            onRemove={()=> dispatch(removeFromCart(item.prodId))}
                            disabled
                        />
                    )
                }}
                keyExtractor={(item)=>item.prodId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        elevation: 5,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, heightl: 2},
        shadowRadius: 5,
        shadowOpacity: 0.21,
    },
    btn: {
        padding: 10,
        backgroundColor: Platform.OS === 'android' ? COLORS.blue : 'white',
        borderRadius: 3,
    },
    btnText: {
        color: Platform.OS === 'android' ? 'white' : COLORS.blue
    }
})

export default CartScreen;