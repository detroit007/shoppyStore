import React from "react";
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import ProductOverView from "../src/screens/shop/ProductOverView";
import ProductDetails from "../src/screens/shop/ProductDetails";
import CartScreen from "../src/screens/shop/CartScreen";

import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/Entypo";
import BarIcon from "react-native-vector-icons/FontAwesome5";
const HomeStack = () =>{
    const Stack = createStackNavigator();
    return(
            <Stack.Navigator
                screenOptions={({navigation})=>({
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: COLORS.primary
                    },
                    headerLeft: ()=> <TouchableOpacity style={{paddingLeft: 15}} activeOpacity={0.6} 
                        onPress={()=>{navigation.toggleDrawer()}}>
                        <BarIcon name='bars' size={22} color='white' />
                    </TouchableOpacity>
                })}
            >
                <Stack.Screen 
                    name='ProductOverView' 
                    component={ProductOverView} 
                    options={({navigation})=>({
                        headerRight: ()=> <TouchableOpacity style={{paddingRight: 15}} activeOpacity={0.6} 
                                onPress={()=>{navigation.navigate('CartScreen')}}>
                                <Icon name='shopping-cart' size={22} color='white' />
                            </TouchableOpacity>,
                        
                    })}
                />
                <Stack.Screen 
                    name='ProductDetails' 
                    component={ProductDetails} 
                    options={({route})=>({
                        title: route.params.product.title
                    })}
                />
                <Stack.Screen
                    name='CartScreen'
                    component={CartScreen}
                    options={{
                        title: 'Your Cart'
                    }}
                />
            </Stack.Navigator>
    )
}

export default HomeStack;