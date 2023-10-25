import "./styles.css";
import { useReducer, useState } from "react";
import Product from "../components/Product";
import ProductForm from "../components/ProductForm";

import { InventoryContext } from "../data/inventoryContext";
import ProductList from "../components/ProductList";
import { inventoryReducer, actions } from "../data/InventoryReducer";

export default function App() {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const [editing, setEditing] = useState(null);

  return (
    <div className="App">
      <InventoryContext.Provider
        value={{
          products: state.products,
          editing: state.editing,
          dispatch
        }}
      >
        <h2>Inventory System</h2>
        {!state.editing ? (
          <>
            <ProductList />
            <button
              className="save-btn add-btn"
              onClick={() => dispatch({ type: actions.EDIT, editing: "new" })}
            >
              Add Product
            </button>
          </>
        ) : (
          <ProductForm />
        )}
      </InventoryContext.Provider>
    </div>
  );
}

const initialState = {
  products: [
    {
      id: 1,
      name: "Lettuce",
      price: 4.56,
      category: "produce",
      inStock: false
    },
    {
      id: 2,
      name: "Milk",
      price: 5.99,
      category: "dairy",
      inStock: true
    }
  ],
  editing: null
};
