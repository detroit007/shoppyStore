import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text ,TouchableOpacity} from "react-native";
import { useSelector } from "react-redux";
import ProductItem from '../../../components/ProductItem';
import colors from '../../../constants/colors';

const UserProduct = () => {
    const userProduct = useSelector(state=> state.products.userProducts);
    return(
        <View style={styles.screen}>
        <FlatList
            data={userProduct}
            renderItem={({item})=>{
                return(
                    <ProductItem
                        title={item.title}
                        imageUrl={item.imageUrl}
                        onSelect={()=>{}}
                    >
                        <TouchableOpacity style={styles.btn} onPress={()=>{}} activeOpacity={0.6}>
                            <Text style={styles.btnText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={()=>{}} activeOpacity={0.6}>
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
