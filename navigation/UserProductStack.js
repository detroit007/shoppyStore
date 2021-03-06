import React from "react";
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/Entypo";
import BarIcon from "react-native-vector-icons/FontAwesome5";
import UserProduct from "../src/screens/user/UserProduct";
import EditProduct from "../src/screens/user/EditProduct";
const UserProductStack = () =>{
    const Stack = createStackNavigator();
    return(
            <Stack.Navigator
                screenOptions={({navigation})=>({
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerLeft: ()=> <TouchableOpacity style={{paddingLeft: 15}} activeOpacity={0.6} 
                        onPress={()=>{navigation.toggleDrawer()}}>
                        <BarIcon name='bars' size={22} color='white' />
                    </TouchableOpacity>
                })}
            >
                <Stack.Screen 
                    name='UserProduct' 
                    component={UserProduct} 
                    options={({navigation})=>({
                        headerRight: ()=> <TouchableOpacity style={{paddingRight: 15}} activeOpacity={0.6} 
                                onPress={()=>{navigation.navigate('EditProduct', {productId: ''})}}>
                                <Icon name='pencil' size={22} color='white' />
                            </TouchableOpacity>,
                    })}
                />
                <Stack.Screen 
                    name='EditProduct'
                    component={EditProduct}
                    options={({ route })=>({
                        title: route.params.productId !== '' ?  "Edit Product" : "Add Product",
                        headerRight: ()=> <TouchableOpacity style={{paddingRight: 15}} activeOpacity={0.6} 
                                onPress={()=>{route.params.submit()}}>
                                <Icon name='pencil' size={22} color='white' />
                            </TouchableOpacity>,
                    })}
                />
            </Stack.Navigator>
    )
}

export default UserProductStack;