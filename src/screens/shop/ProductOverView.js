import React from "react";
import { FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../../components/ProductItem";
import colors from "../../../constants/colors";
import { addToCart } from "../../../store/actions/cart";

const ProductOverView = ({navigation}) =>{
    const products = useSelector(state =>  state.products.availableProduct);
    const dispatch = useDispatch();
    return(
        <FlatList
            data={products}
            renderItem={({item})=> <ProductItem 
                title={item.title} 
                imageUrl={item.imageUrl} 
                price={item.price}
                onSelect={()=>{navigation.navigate('ProductDetails', {product: item})}}
            >
                <TouchableOpacity style={styles.btn} 
                    onPress={()=>{
                        navigation.navigate('ProductDetails', {product: item})}
                    } 
                    activeOpacity={0.6}
                >
                    <Text style={styles.btnText}>View Detail</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} 
                    onPress={()=>{
                        dispatch(addToCart(item))}
                    } 
                    activeOpacity={0.6}
                >
                    <Text style={styles.btnText}>To Cart</Text>
                </TouchableOpacity>
            </ProductItem>
            }
            keyExtractor={item => item.id}
        />
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : 'transparent',
        padding: 7,
        width: 90,
        borderRadius: 3,
        alignItems: 'center'
    },
    btnText: {
        color: Platform.OS === 'android' ? 'white' : colors.primary
    }
})

export default ProductOverView;