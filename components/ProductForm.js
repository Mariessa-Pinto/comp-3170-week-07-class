import { useContext, useState } from "react";
import { InventoryContext } from "../data/inventoryContext";
import { nanoid } from "nanoid";
import { categories } from "../data/categories";
import { actions } from "../data/InventoryReducer";

export default function ProductForm() {
  const { editing, products, dispatch } = useContext(InventoryContext);

  let initialData = {
    name: "",
    price: 0,
    category: "",
    inStock: false
  };
  if (editing !== "new") {
    initialData = products.find(function (p) {
      return p.id === editing;
    });
  }

  const [product, setProduct] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();

    if (editing === "new") {
      dispatch({
        type: actions.ADD,
        product: {
          ...product,
          id: nanoid()
        }
      });
    } else {
      dispatch({
        type: actions.UPDATE,
        product
      });
    }
  }

  function handleInput(e, field) {
    setProduct({ ...product, [field]: e.target.value });
  }
  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleInput(e, "name")}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => handleInput(e, "price")}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            defaultValue={product.category}
            onChange={(e) => handleInput(e, "category")}
          >
            <option value="">--select category--</option>
            {categories.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-btns">
          <button
            className="cancel-btn"
            onClick={() =>
              dispatch({
                type: actions.EDIT,
                editing: null
              })
            }
          >
            cancel
          </button>
          <button className="save-btn">save</button>
        </div>
      </form>
    </div>
  );
}
