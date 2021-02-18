import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/product";

const initialState = {
    availableProduct: PRODUCTS,
    userProducts: PRODUCTS.filter(item => item.uId === 'u1')
}

const productReducer = (state = initialState, action) =>{
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(state => state.id !== action.pid),
                availableProduct: state.availableProduct.filter(state=> state.id !== action.pid)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString, 
                'u1',
                action.productData.title, 
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
            );
            return{
                ...state,
                availableProduct: state.availableProduct.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }

        case UPDATE_PRODUCT:
            const updatedProductIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[updatedProductIndex].uId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[updatedProductIndex].price,
            )

            const updatedUserProduct = [...state.userProducts];
            updatedUserProduct[updatedProductIndex] = updatedProduct;

            const updatedAvailableProductIndex = state.availableProduct.findIndex(prod => prod.id === action.pid)
            const updatedAvailableProduct = [...state.availableProduct];
            updatedAvailableProduct[updatedAvailableProductIndex] = updatedProduct;

            return{
                ...state,
                availableProduct: updatedAvailableProduct,
                userProducts: updatedUserProduct,
            }
        default:
            return state;
    }
}

export default productReducer;