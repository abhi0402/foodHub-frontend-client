import {
  SET_USER,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  account: {},
  name: "",
  address: {},
  imageUrl: [],
  payment: [],
  items: [],
  tags: "",
  minOrderAmount: "",
  costForOne: "",
  cart: {},
  _id: "",
  firstName: "",
  lastName: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case ADD_ITEM:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? { ...action.payload } : item
        ),
      };

    default:
      return state;
  }
}
