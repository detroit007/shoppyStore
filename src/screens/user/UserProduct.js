import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text ,TouchableOpacity, Alert} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from '../../../components/ProductItem';
import colors from '../../../constants/colors';
import { deleteProduct } from '../../../store/actions/product';

const UserProduct = ({navigation}) => {
    const userProduct = useSelector(state=> state.products.userProducts);
    const dispatch = useDispatch();

    const deleteProductHandler = (id) =>{
        Alert.alert(
            "Are you sure!",
            "Do you really want to delte this product",
            [
                {text: "No", style: 'default'},
                {text: 'Yes', style: 'destructive', onPress: ()=>{
                    dispatch(deleteProduct(id))
                }}
            ]
        )
    }

    return(
        <View style={styles.screen}>
        <FlatList
            data={userProduct}
            keyExtractor={(item, index)=> item + index}
            renderItem={({item})=>{
                return(
                    <ProductItem
                        title={item.title}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        onSelect={()=>{
                            navigation.navigate('EditProduct', {productId: item.id})
                        }}
                    >
                        <TouchableOpacity style={styles.btn} onPress={()=>{
                            navigation.navigate('EditProduct', {productId: item.id})
                        }} activeOpacity={0.6}>
                            <Text style={styles.btnText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={()=> deleteProductHandler(item.id)} activeOpacity={0.6}>
                            <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                    </ProductItem>
                )
            }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    btn: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : 'transparent',
        padding: 7,
        width: 70,
        alignItems: 'center',
        borderRadius: 3
    },
    btnText: {
        color: Platform.OS === 'android' ? 'white' : colors.primary
    }
});

export default UserProduct;