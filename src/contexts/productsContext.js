import React, { useReducer } from "react";
import axios from "axios";

import { CASE_GET_PRODUCTS } from "../helpers/cases";
import { PRODUCTS_API } from "../helpers/consts";

export const productsContext = React.createContext();

const INIT_STATE = {
    products: [],
    productsTotalCount: 0,
}

const reducer = (state = INIT_STATE, action ) => {
    switch (action.type) {
        case CASE_GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.data,
                productsTotalCount: action.payload.headers["x-total-count"],
            };
        default: return state;
    }
}

const ProductsContextProvider =({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);


    async function getProducts(){
        let result = await axios.get(`${PRODUCTS_API}${window.location.search}`);
        console.log("getProducts result", result);
        dispatch({
            type: CASE_GET_PRODUCTS,
            payload: result
        })
    }

    async function createProduct (newProduct){
        await axios.post(PRODUCTS_API, newProduct);
        getProducts();
    }

    async function deleteProduct(id){
        await axios.delete(`${PRODUCTS_API}/${id}`);
        getProducts();
    }

    async function updateProducts(id, editedProduct){
        await axios.patch(`${PRODUCTS_API}/${id}`, editedProduct);
        getProducts();
    }

    return (
        <productsContext.Provider
            value={{
                products: state.products,
                productsTotalCount: state.productsTotalCount,
                getProducts,
                createProduct,
                deleteProduct,
                updateProducts,
            }}>
            {children}
        </productsContext.Provider>
    )
}

export default ProductsContextProvider