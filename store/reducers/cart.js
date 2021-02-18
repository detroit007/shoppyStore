import { act } from "react-test-renderer";
import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/product";

const initailaState = {
    items: {},
    totalAmount: 0
};

const cartReducer = (state = initailaState, action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            let updatedProduct;
            const prod = action.product;
            const prodTitle = prod.title;
            const prodPrice = prod.price;
            if (state.items[prod.id]) {
                updatedProduct = new CartItem(
                    state.items[prod.id].quantity + 1,
                    prodTitle,
                    prodPrice,
                    state.items[prod.id].sum + prodPrice
                )
            }else{
                updatedProduct = new CartItem(1, prodTitle, prodPrice, prodPrice);
            }
        return {
            ...state,
            items: {...state.items, [prod.id]: updatedProduct},
            totalAmount: state.totalAmount + prodPrice
        }
        case REMOVE_FROM_CART :
            let afterRemoveProducts;
            const productToRemove = state.items[action.pid];
            if(productToRemove.quantity > 1){
                const afterRemoveProduct = new CartItem(
                    productToRemove.quantity - 1,
                    productToRemove.prodTitle,
                    productToRemove.prodPrice,
                    productToRemove.sum - productToRemove.prodPrice
                )
                afterRemoveProducts = {...state.items, [action.pid]: afterRemoveProduct}
            } else{
                delete state.items[action.pid];
                afterRemoveProducts = {...state.items};
            }
            return {
                ...state,
                items: afterRemoveProducts,
                totalAmount: state.totalAmount - productToRemove.prodPrice,
            }
        case ADD_ORDER:
            return initailaState;
        case DELETE_PRODUCT: 
            if(!state.items[action.pid]){
                return state;
            }
            const productItems = {...state.items};
            const itemTotal = productItems[action.pid].sum;
            delete productItems[action.pid];
            return{
                ...state,
                items: productItems,
                totalAmount: state.totalAmount - itemTotal
            }
        default :
            return state;
    }
}

export default cartReducer;