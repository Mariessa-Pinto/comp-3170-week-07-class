import { useContext } from "react";

import { InventoryContext } from "../data/inventoryContext";
import { actions } from "../data/InventoryReducer";

export default function Product({ product }) {
  const { dispatch } = useContext(InventoryContext);

  function handleCheckbox() {
    dispatch({
      type: actions.UPDATE,
      product: {
        ...product,
        inStock: !product.inStock
      }
    });
  }

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>
        <span>Price</span>: {`$${product.price}`}
      </p>
      <p>
        <span>Category</span>: {product.category}
      </p>
      <label>
        {product.inStock ? "In stock" : "Not in stock"}
        <input
          type="checkbox"
          checked={product.inStock}
          onChange={handleCheckbox}
        />
      </label>
      <button
        className="edit-btn"
        onClick={() =>
          dispatch({
            type: actions.EDIT,
            editing: product.id
          })
        }
      >
        Edit
      </button>
      <button
        className="delete-btn"
        onClick={() =>
          dispatch({
            type: actions.DELETE,
            id: product.id
          })
        }
      >
        Delete
      </button>
    </div>
  );
}
