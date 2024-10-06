//reducer
import { ADD_CASH, GET_CASH, ADD_COUNT, GET_COUNT, SELECT_CATEGORY, ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_CART_ITEM } from './actionTypes';


const defaultState = {
  cash: 5,
  count: 1,
  pin: '' // Если нужно использовать и pin
};

const initialState = {
  selectedCategory: null,
  cartItems: [],
};

const reducer = (state = { ...defaultState, ...initialState }, action) => {
  switch (action.type) {
    case ADD_CASH:
      return { ...state, cash: state.cash + action.payload };
    case GET_CASH:
      return { ...state, cash: state.cash - action.payload };

    case ADD_COUNT:
      return { ...state, count: state.count + action.payload };
    case GET_COUNT:
      return { ...state, count: state.count - action.payload };
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    // case ADD_TO_CART:
    //   const newItem = action.payload;
    //   const existingCartItem = state.cartItems.find(item => item.id === newItem.id);

    //   if (existingCartItem) {
    //     // Если товар уже есть в корзине, увеличиваем его количество
    //     const updatedCartItems = state.cartItems.map(item => {
    //       if (item.id === newItem.id) {
    //         return {
    //           ...item,
    //           quantity:  newItem.quantity
    //         };
    //       }
    //       return item;
    //     });

    //     return {
    //       ...state,
    //       cartItems: updatedCartItems
    //     };
    //   } else {
    //     // Если товара нет в корзине, добавляем его как новый элемент
    //     return {
    //       ...state,
    //       cartItems: [...state.cartItems, { ...newItem }]
    //     };
    //   }
    // case UPDATE_CART_ITEM:
    //   const { productId, quantity } = action.payload;
    //   const updatedCartItems = state.cartItems.map(item => {
    //     if (item.id === productId) {
    //       return { ...item, quantity };
    //     }
    //     return item;
    //   });

    //   return {
    //     ...state,
    //     cartItems: updatedCartItems
    //   };
    case ADD_TO_CART:
      const newItem = action.payload;

      const existingCartItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);

      if (existingCartItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        const updatedCartItems = [...state.cartItems];
        // updatedCartItems[existingCartItemIndex].quantity += 1;
        updatedCartItems[existingCartItemIndex].count += 1; // Увеличиваем count
        console.log('updatedCartItems[existingCartItemIndex].count', updatedCartItems[existingCartItemIndex].count)
        return {
          ...state,
          cartItems: updatedCartItems
        };
      } else {
        // Если товара еще нет в корзине, добавляем его с начальным количеством
        const newItemWithQuantity = {
          ...newItem,

          //  quantity:1, // Используем значение quantity из payload

        };

        return {
          ...state,
          cartItems: [...state.cartItems, newItemWithQuantity]
        };
      }

    case UPDATE_CART_ITEM:
      const { productId, count } = action.payload;
      console.log('Updating item with productId:', productId, 'to count:', count); // Логируем обновляемые данные
      const updatedCartItems = state.cartItems.map(item => {
        if (item.id === productId) {
          return { ...item, count };
        }
        return item;
      });
      console.log('Updated cartItems:', updatedCartItems); // Логируем обновленный массив cartItems
      return {
        ...state,
        cartItems: updatedCartItems
      };



      case 'REMOVE_CART_ITEM':
        const { productId: removeProductId } = action.payload;
        const filteredCartItems = state.cartItems.filter(item => item.id !== removeProductId);
        return {
          ...state,
          cartItems: filteredCartItems
        };
      


    default:
      return state;

  }
};
export default reducer;
