import { createSlice } from '@reduxjs/toolkit'

const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}
const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0
}

const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}


export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addtoBasket: (state, action) => {
            const findProduct = state.products && state.products.find((product) => product.id == action.payload.id);
            if (findProduct) {
                //daha önce eklenmiştir 
                const extractedProducts = state.products.filter((product) => product.id !== action.payload.id);

                findProduct.count += action.payload.count;

                state.products = [...extractedProducts, findProduct];
                writeFromBasketToStorage(state.products);
            }
            else {
                state.products = [...state.products, action.payload];
                writeFromBasketToStorage(state.products);
            }
        },
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        calculateBasket: (state) => {
            state.totalAmount = 0;
            state.products && state.products.map((product) => {
                state.totalAmount += product.price * product.count;
            })
        },
        deletefromBasket: (state,action) => {
            const findProduct = state.products && state.products.find((product) => product.id == action.payload.id);
            if (findProduct.count > 1) {
                findProduct.count -= 1;
                const extractedProducts = state.products.filter((product) => product.id !== action.payload.id);
                state.products = [...extractedProducts, findProduct];
            } else {
                state.products = state.products.filter((product) => product.id !== action.payload.id);
            }
            localStorage.setItem("basket", JSON.stringify(state.products));
        }
    }
})


export const { addtoBasket, setDrawer, calculateBasket ,deletefromBasket} = basketSlice.actions

export default basketSlice.reducer