import React from 'react';

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import DrawerNavigator from './navigation/DrawerNavigator';


const App: () => React$Node = () => {

  const rootreducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
  });

  const store = createStore(rootreducer);

  return (
    <Provider store={store} >
      <DrawerNavigator/>
    </Provider>
  );
};

export default App;
