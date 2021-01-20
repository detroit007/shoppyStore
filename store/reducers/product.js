import PRODUCTS from "../../data/dummy-data";

const initialState = {
    availableProduct: PRODUCTS,
    userProducts: PRODUCTS.filter(item => item.uId === 'u1')
}

const productReducer = (state = initialState, action) =>{
    return state;
}

export default productReducer;