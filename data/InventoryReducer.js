export const actions = {
  ADD: "added",
  EDIT: "edited",
  DELETE: "deleted",
  UPDATE: "updated"
};

export function inventoryReducer(state, action) {
  switch (action.type) {
    case actions.ADD: {
      return {
        ...state,
        products: [...state.products, action.product],
        editing: null
      };
    }
    case actions.EDIT: {
      return {
        ...state,
        editing: action.editing
      };
    }
    case actions.DELETE: {
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id)
      };
    }
    case actions.UPDATE: {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.product.id) {
            return action.product;
          } else {
            return product;
          }
        }),
        editing: null
      };
    }
    default:
      return state;
  }
}
