// actions.js

import { ADD_CASH, GET_CASH, ADD_COUNT, GET_COUNT, ADD_TO_CART, UPDATE_CART_ITEM  } from './actionTypes'; // импортируем типы действий
import { SELECT_CATEGORY } from './actionTypes';

export const addCash = (amount) => ({
  type: ADD_CASH,
  payload: amount
});

export const getCash = (amount) => ({
  type: GET_CASH,
  payload: amount
});

export const addCount = (amount) => ({
  type: ADD_COUNT,
  payload: amount
});

export const getCount = (amount) => ({
  type: GET_COUNT,
  payload: amount
});


export const selectCategory = (categoryId) => ({
  type: SELECT_CATEGORY,
  payload: categoryId
});


export const addToCart = (product, quantity) => ({
  type: ADD_TO_CART,
  payload: { ...product, quantity }
});

export const updateCartItem = (productId, count) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count }
});

export const removeCartItem = (productId) => {
  return {
      type: 'REMOVE_CART_ITEM',
      payload: {
          productId
      }
  };
};