import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrderScreen from "../src/screens/shop/OrderScreen";
import HomeStack from "./HomeStack";
import UserProductStack from "./UserProductStack";
import Icon from "react-native-vector-icons/Entypo";
import colors from "../constants/colors";


const DrawerNavigator = () =>{
    const Drawer = createDrawerNavigator();
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={HomeStack}
                    options={{
                        
                        drawerIcon: ({color})=> <Icon name='pencil' size={22} color={color} />
                    }}
                />
                <Drawer.Screen name='OrderScreen' component={OrderScreen} />
                <Drawer.Screen name='Admin' component={UserProductStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigator;