import {
  SET_RESTAURANTS,
  LOADING_DATA,
  SET_RESTAURANT,
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  SET_CART,
  DELETE_ITEM_CART,
  SET_ORDERS,
  EDIT_STATUS,
} from "../types";

const initialState = {
  restaurants: [],
  restaurant: {},
  cart: [],
  price: "",
  loading: false,
  addCartSuccess: null,
  deleteSuccessItem: null,
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_RESTAURANTS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };
    case SET_RESTAURANT:
      return {
        ...state,
        loading: false,
        restaurant: action.payload.result,
      };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        addCartSuccess: true,
      };
    case ADD_CART_FAIL:
      return {
        ...state,
        addCartSuccess: false,
      };
    case DELETE_ITEM_CART:
      return {
        ...state,
        deleteSuccessItem: true,
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case EDIT_STATUS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? { ...action.payload } : order
        ),
      };
    case SET_CART:
      return {
        ...state,
        loading: false,
        cart: action.payload.cart,
        price: action.payload.totalPrice,
      };
    default:
      return state;
  }
}
