import Product from "./Product";
import { useContext, useState } from "react";
import { InventoryContext } from "../data/inventoryContext";
import { categories } from "../data/categories";
import { filter, sort } from "../utils/helpers";

export default function ProductList() {
  const { products } = useContext(InventoryContext);

  const [filterSelection, setFilterSelection] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [inStockFilter, setInStockFilter] = useState(false);

  let displayedProducts = sort(products, sortOrder);
  displayedProducts = filter(displayedProducts, filterSelection, inStockFilter);

  return (
    <div>
      <div className="filters">
        <label>
          Filters:
          <select
            defaultValue={filterSelection}
            onChange={(e) => setFilterSelection(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Sort by:
          <select
            defaultValue={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Alphabetically</option>
            <option value="2">Price</option>
          </select>
        </label>

        <label>
          In stock:
          <input
            type="checkbox"
            checked={inStockFilter}
            onChange={() => setInStockFilter(!inStockFilter)}
          />
        </label>
      </div>
      <div className="products">
        {displayedProducts.map((p) => (
          <Product product={p} />
        ))}
      </div>
    </div>
  );
}
